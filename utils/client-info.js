export default {
    get browserName() {
        var browserName, userAgent = navigator.userAgent;
        if (/Firefox/i.test(navigator.userAgent)) {
            browserName = "Firefox";
        } else if (/Opera/i.test(navigator.userAgent)) {
            browserName = "Opera";
        } else if (/Trident/i.test(navigator.userAgent)) {
            browserName = "Internet Explorer";
        } else if (/Edge|EdgA/i.test(navigator.userAgent)) {
            browserName = "Edge";
        } else if (/Chrome/i.test(navigator.userAgent)) {
            browserName = "Chrome";
        } else if (/Safari/i.test(navigator.userAgent)) {
            browserName = "Safari";
        } else {
            browserName = "unknown";
        }
        return browserName
    },
    platform: {
        get isPWA() {
            if (window.matchMedia('(display-mode: standalone)').matches)
                return true
            return false
        },

        get isMobile() {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
                return true
            return false
        },

        get isAndroid() {
            if (/Android/i.test(navigator.userAgent))
                return true
            return false
        },

        get isIOS() {
            if (/iPhone|iPad|iPod/i.test(navigator.userAgent))
                return true
            return false
        },
    },
}
