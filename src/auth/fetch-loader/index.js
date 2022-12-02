const loader = {
    spinner: undefined,
};

loader.start = () => {
    const target = document.querySelector("#app-dialog");
    let div = document.createElement("div");
    target.append(div);
    div.classList.add("backdrop");
};

loader.stop = () => {
    loader.spinner.stop(document.querySelector("#app-dialog"));
    let div = document.querySelector(".backdrop");
    div.remove();
};

export default loader;
