const AlertMessage = {
    ref: null,
    setAlertMessageRef: function(alertMessageRef) {
        AlertMessage.ref = alertMessageRef;
    },
    getAlertMessageRef: function() {
        return AlertMessage.ref;
    },
    showAlertMessage: function(message, type, position) {
        AlertMessage.ref.showAlertMessage(message, type, position);
    },
};

export default AlertMessage;