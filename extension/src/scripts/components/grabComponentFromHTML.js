// this is a simple function that will grab the element you want given the
// filename the element is placed is, and the id of that element.
// Currently, functionality is limited to one element. In the future
// this function should any number of elementID's (with only 1 filename)
// and output all the elements.
const grabComponentFromHTML = async (fileName, elementID) => {
    const response = await fetch(
        chrome.runtime.getURL(`components/${fileName}`),
    );
    const htmlText = await response.text();

    const container = document.createElement("div");
    container.innerHTML = htmlText;

    return container.querySelector(`#${elementID}`);
};

export default grabComponentFromHTML;
