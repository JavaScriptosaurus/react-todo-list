export default function (element) {

    const range = document.createRange();
    const selection = window.getSelection();
    range.setStart(element, 1);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    element.focus();

}
