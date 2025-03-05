window.addEventListener("load", function() {
    setTimeout(() => {
        document.getElementById("loadingScreen").classList.add("-translate-y-full", "opacity-0");
        document.getElementById("web-content").classList.remove("opacity-0", "translate-y-10");
    }, 1000);
});