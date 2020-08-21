function removeClass(str, element) {
    var re = new RegExp(`\\b${str}\\b`, 'gi');
    element.className = element.className.replace(re, "");
}


export default {
    animate: function (element, classTitle, classesForDelete) {
        if (classesForDelete) {
            classesForDelete.forEach((value) => {
                removeClass(" " + value, element)
            });
        }
        removeClass(" " + classTitle, element)
        element.className = element.className + " " + classTitle;
    }
}