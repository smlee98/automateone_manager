import Tagify from "@yaireo/tagify";

const tagifyEnabler = () => {
    const inputEl = document.querySelectorAll(".tagify");
    inputEl.forEach((el) => new Tagify(el));
};

tagifyEnabler();
