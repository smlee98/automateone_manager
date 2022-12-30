export const DynamicTable = class {
    getChecks = () => [...this.tbody.querySelectorAll(`tr`)];

    getRemoveButtons = () => [...this.root.querySelectorAll(".row-remove-btn")];

    processChecks = () => {
        // counter
        const { length } = this.getChecks().filter((el) => el.checked);
        this.counter.forEach((el) => (el.innerHTML = length));
        this.locked.forEach((el) => (el.disabled = length === 0));
    };

    setId = (tr, idxIn) => {
        const idx = idxIn || this.getChecks().length;
        [...tr.querySelectorAll("input, button")].forEach((control) => {
            control.id = `${control.name}-${idx}`;
        });

        if (tr.querySelector(".row-idx"))
            tr.querySelector(".row-idx").innerText = idx;
    };

    addRow = (...arg) => {
        const tr = this.tr.cloneNode(true);
        const btn = tr.querySelector(".row-remove-btn");
        btn && btn.addEventListener("click", this.removeRow);
        this.tbody.append(tr);
        this.setId(tr);

        if (arg.length > 0) {
            arg[0].constructor.name === "PointerEvent" && arg.shift();
            const controls = [...tr.querySelectorAll(".row-control")];
            controls
                .filter((el, idx) => arg[idx])
                .forEach((el, idx) => {
                    if (typeof arg[idx] !== "object") {
                        if (el.tagName && el.tagName === "INPUT") {
                            if (el.type === "checkbox") {
                                el.value
                                    ? (el.checked = true)
                                    : (el.checked = false);
                            } else {
                                el.value = arg[idx];
                            }
                        } else if (el.tagName && el.tagName === "SPAN") {
                            el.innerText = arg[idx];
                        }
                    } else {
                        arg[idx].class && (el.className = arg[idx].class);
                        arg[idx].inner && (el.innerHTML = arg[idx].inner);
                        Object.assign(el, arg[idx]);
                    }
                });
        }
    };

    removeRow = (specified) => {
        console.log(specified);
        specified.constructor.name.endsWith("Event") &&
            specified.target.parentNode.parentNode.remove();
        specified.constructor.name === "HTMLTableRowElement" &&
            specified.remove();
        typeof specified === "number" &&
            this.tbody.querySelector(`tr:nth-child(${specified})`).remove();

        this.getChecks().forEach((el, idx) => {
            this.setId(el, idx + 1);
        });
    };

    observer = {
        thead: new window.MutationObserver(() => {
            this.makeTemplate();
            this.setId();
        }),
        tbody: new window.MutationObserver(() => {
            this.getChecks().forEach((el) => {
                el.addEventListener("click", this.processChecks);
            });
            this.getRemoveButtons().forEach((el) =>
                el.addEventListener("click", this.removeRow)
            );
            this.setId();
        }),
    };

    init = (option) => {
        this.counter = [...this.root.querySelectorAll(".row-counter")];
        this.addBtn = [...this.root.querySelectorAll(".row-add-btn")];
        this.locked = [...this.root.querySelectorAll(".row-locked")];
        this.thead = this.root.querySelector("thead");
        this.tbody = this.root.querySelector("tbody");
        this.tr = document.createElement("tr");
        Object.assign(this, option);

        // remove
        this.getRemoveButtons().length !== 0 &&
            this.getRemoveButtons().forEach((el) =>
                el.addEventListener("click", this.removeRow)
            );

        // add
        const headers = [...this.thead.querySelectorAll("th[data-gr-tag]")];
        const tds = this.template
            ? Object.keys(this.template).map((key) => {
                  const td = document.createElement("td");
                  const { rootClass, attribute } = this.template[key];
                  rootClass && (td.className = rootClass);
                  const control = document.createElement(
                      this.template[key].tag
                  );
                  Object.assign(control, attribute);
                  control.className = attribute.className;
                  control.classList.add("row-control");
                  td.append(control);
                  return td;
              })
            : headers.map((header) => {
                  const td = document.createElement("td");
                  const tdClass = header.getAttribute("data-gr-class");
                  tdClass && (td.className = tdClass);
                  const control = document.createElement(
                      header.getAttribute("data-gr-tag")
                  );
                  const tagClass = header.getAttribute("data-gr-tag-class");
                  tagClass && (control.className = tagClass);
                  const tagInner = header.getAttribute("data-gr-tag-inner");
                  tagInner && (control.innerHTML = tagInner);
                  const attributes = {};
                  [...header.attributes]
                      .filter(
                          ({ name }) =>
                              name !== "data-gr-tag-class" &&
                              name !== "data-gr-tag-inner" &&
                              name.startsWith("data-gr-tag-")
                      )
                      .forEach(({ name, value }) => {
                          attributes[name.replace("data-gr-tag-", "")] = value;
                      });
                  Object.assign(control, attributes);
                  control.classList.add("row-control");
                  td.append(control);
                  return td;
              });
        this.tr.append(...tds);
        if (this.addBtn.length > 0) {
            this.addBtn.forEach((el) =>
                el.addEventListener("click", this.addRow)
            );
        }
    };

    constructor(root, option) {
        typeof root.constructor.name.endsWith("Element") && (this.root = root);
        this.init(option ?? {});
    }
};

const dynamicTableInit = () => {
    const elements = document.querySelectorAll(".dynamic-table");
    [...elements].forEach((el) => {
        Object.assign(el, new DynamicTable(el));
    });
};

export default dynamicTableInit;
