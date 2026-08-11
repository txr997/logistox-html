/*
    el-booking-1.js
    Dynamic property booking form (For Rent / For Sale)
    - No build tools, no modules. Plain global script, load via <script> tag.
    - Works with Bootstrap 5 tabs (data-bs-toggle="tab").
    - Dropdown options are static now but structured to be replaced by
      an API response later (see ElBooking.populateSelect()).
    - Native <select> elements are kept (hidden) as the source of truth for
      form submission/accessibility; a custom-styled dropdown UI is built
      on top of each one so option padding/hover/colors are fully themeable
      and consistent across all browsers.
*/

(function () {
    "use strict";

    var ElBooking = {

        init: function () {
            var formEls = document.querySelectorAll(".el-booking-1-form");
            if (!formEls.length) return;

            formEls.forEach(function (formEl) {
                this.bindSubmit(formEl);
            }, this);

            this.buildAllCustomSelects();
            this.bindTabChange();
            this.bindFilterPopup();

            document.addEventListener("click", function () {
                ElBooking.closeAllCustomSelects();
            });

            document.addEventListener("keydown", function (e) {
                if (e.key === "Escape") {
                    ElBooking.closeAllCustomSelects();
                }
            });
        },

        /* ---------------------------------------------------------------- */
        /* Custom select (built from a native <select>, kept in sync)       */
        /* ---------------------------------------------------------------- */

        buildAllCustomSelects: function () {
            document.querySelectorAll(".el-booking-1-select").forEach(function (selectEl) {
                ElBooking.buildCustomSelect(selectEl);
            });
        },

        /* turns one native <select> into a custom-styled dropdown */
        buildCustomSelect: function (selectEl) {
            if (selectEl.dataset.customBuilt === "true") return;

            var wrap = document.createElement("div");
            wrap.className = "el-booking-1-custom-select";

            var trigger = document.createElement("button");
            trigger.type = "button";
            trigger.className = "el-booking-1-custom-select-trigger";
            trigger.setAttribute("aria-haspopup", "listbox");
            trigger.setAttribute("aria-expanded", "false");

            var list = document.createElement("ul");
            list.className = "el-booking-1-custom-select-list";
            list.setAttribute("role", "listbox");

            selectEl.parentNode.insertBefore(wrap, selectEl);
            wrap.appendChild(trigger);
            wrap.appendChild(list);
            wrap.appendChild(selectEl);

            selectEl.classList.add("el-booking-1-select--native");
            selectEl.setAttribute("tabindex", "-1");
            selectEl.setAttribute("aria-hidden", "true");
            selectEl.dataset.customBuilt = "true";

            ElBooking.renderCustomOptions(selectEl, wrap, trigger, list);

            trigger.addEventListener("click", function (e) {
                e.stopPropagation();
                var isOpen = wrap.classList.contains("is-open");
                ElBooking.closeAllCustomSelects();
                if (!isOpen) {
                    wrap.classList.add("is-open");
                    trigger.setAttribute("aria-expanded", "true");
                }
            });

            wrap.addEventListener("click", function (e) {
                e.stopPropagation();
            });
        },

        /* (re)draw trigger label + option list from the native select's current options */
        renderCustomOptions: function (selectEl, wrap, trigger, list) {
            var options = Array.prototype.slice.call(selectEl.options);

            trigger.textContent = (selectEl.selectedOptions[0] || options[0] || {}).text || "";

            list.innerHTML = "";

            options.forEach(function (opt) {
                var li = document.createElement("li");
                li.className = "el-booking-1-custom-select-option";
                li.setAttribute("role", "option");
                li.textContent = opt.text;
                li.dataset.value = opt.value;

                if (opt.selected) {
                    li.classList.add("is-selected");
                    li.setAttribute("aria-selected", "true");
                }

                li.addEventListener("click", function (e) {
                    e.stopPropagation();

                    selectEl.value = opt.value;
                    selectEl.dispatchEvent(new Event("change", { bubbles: true }));

                    list.querySelectorAll(".el-booking-1-custom-select-option").forEach(function (el) {
                        el.classList.remove("is-selected");
                        el.removeAttribute("aria-selected");
                    });
                    li.classList.add("is-selected");
                    li.setAttribute("aria-selected", "true");

                    trigger.textContent = opt.text;
                    wrap.classList.remove("is-open");
                    trigger.setAttribute("aria-expanded", "false");
                });

                list.appendChild(li);
            });
        },

        closeAllCustomSelects: function () {
            document.querySelectorAll(".el-booking-1-custom-select.is-open").forEach(function (wrap) {
                wrap.classList.remove("is-open");
                var trigger = wrap.querySelector(".el-booking-1-custom-select-trigger");
                if (trigger) trigger.setAttribute("aria-expanded", "false");
            });
        },

        /* ---------------------------------------------------------------- */
        /* Advanced-filter popup                                            */
        /* ---------------------------------------------------------------- */

        bindFilterPopup: function () {
            var triggers = document.querySelectorAll(".el-booking-1-filter-btn");

            triggers.forEach(function (btn) {
                var popupId = btn.getAttribute("aria-controls");
                var popup = document.getElementById(popupId);
                if (!popup) return;

                btn.addEventListener("click", function (e) {
                    e.stopPropagation();
                    var isOpen = popup.classList.contains("is-open");

                    ElBooking.closeAllFilterPopups();

                    if (!isOpen) {
                        popup.classList.add("is-open");
                        btn.classList.add("is-active");
                        btn.setAttribute("aria-expanded", "true");
                    }
                });

                var closeBtn = popup.querySelector(".el-booking-1-filter-close");
                if (closeBtn) {
                    closeBtn.addEventListener("click", function (e) {
                        e.stopPropagation();
                        ElBooking.closeAllFilterPopups();
                    });
                }

                var applyBtn = popup.querySelector(".el-booking-1-filter-apply");
                if (applyBtn) {
                    applyBtn.addEventListener("click", function (e) {
                        e.stopPropagation();
                        ElBooking.closeAllFilterPopups();
                    });
                }

                popup.addEventListener("click", function (e) {
                    e.stopPropagation();
                });
            });

            document.addEventListener("click", function () {
                ElBooking.closeAllFilterPopups();
            });

            document.addEventListener("keydown", function (e) {
                if (e.key === "Escape") {
                    ElBooking.closeAllFilterPopups();
                }
            });
        },

        closeAllFilterPopups: function () {
            document.querySelectorAll(".el-booking-1-filter-popup.is-open").forEach(function (popup) {
                popup.classList.remove("is-open");
            });
            document.querySelectorAll(".el-booking-1-filter-btn.is-active").forEach(function (btn) {
                btn.classList.remove("is-active");
                btn.setAttribute("aria-expanded", "false");
            });
        },

        /* ---------------------------------------------------------------- */
        /* Form submit / tab change                                        */
        /* ---------------------------------------------------------------- */

        bindSubmit: function (formEl) {
            formEl.addEventListener("submit", function (e) {
                e.preventDefault();

                var formType = formEl.getAttribute("data-form-type");
                var payload = ElBooking.serializeForm(formEl);
                payload.type = formType;

                ElBooking.onSearch(payload, formEl);
            });
        },

        serializeForm: function (formEl) {
            var data = {};
            var fields = formEl.querySelectorAll("input[name], select[name]");

            fields.forEach(function (field) {
                data[field.name] = field.value;
            });

            return data;
        },

        onSearch: function (payload, formEl) {
            console.log("Booking search payload:", payload);

            // Example of where a real request would go:
            //
            // fetch("/api/properties/search", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(payload)
            // })
            //     .then(function (res) { return res.json(); })
            //     .then(function (result) { ElBooking.renderResults(result); })
            //     .catch(function (err) { console.error(err); });

            formEl.dispatchEvent(new CustomEvent("elBooking:search", {
                bubbles: true,
                detail: payload
            }));
        },

        bindTabChange: function () {
            var tabButtons = document.querySelectorAll('[data-bs-toggle="tab"][data-booking-type]');

            tabButtons.forEach(function (btn) {
                btn.addEventListener("shown.bs.tab", function (e) {
                    var type = e.target.getAttribute("data-booking-type");
                    document.dispatchEvent(new CustomEvent("elBooking:tabChange", {
                        detail: { type: type }
                    }));
                });
            });
        },

        /*
            Populate a <select> dynamically from an array of {value, label}.
            Rebuilds the custom dropdown UI too, so this stays the single
            entry point once dropdown data comes from an API:

            ElBooking.populateSelect(
                document.querySelector("#el-rent-location"),
                [{ value: "london", label: "London" }, ...],
                "All Cities"
            );
        */
        populateSelect: function (selectEl, options, placeholderLabel) {
            if (!selectEl) return;

            selectEl.innerHTML = "";

            var placeholderOpt = document.createElement("option");
            placeholderOpt.value = "";
            placeholderOpt.selected = true;
            placeholderOpt.textContent = placeholderLabel || "Select";
            selectEl.appendChild(placeholderOpt);

            options.forEach(function (opt) {
                var optionEl = document.createElement("option");
                optionEl.value = opt.value;
                optionEl.textContent = opt.label;
                selectEl.appendChild(optionEl);
            });

            var wrap = selectEl.closest(".el-booking-1-custom-select");
            if (wrap) {
                var trigger = wrap.querySelector(".el-booking-1-custom-select-trigger");
                var list = wrap.querySelector(".el-booking-1-custom-select-list");
                ElBooking.renderCustomOptions(selectEl, wrap, trigger, list);
            }
        }
    };

    document.addEventListener("DOMContentLoaded", function () {
        ElBooking.init();
    });

    /* expose globally so other scripts (and future API integration) can use it */
    window.ElBooking = ElBooking;

})();