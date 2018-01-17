function Message (messageText, messageNr) {

    this.text = messageText;
    this.messageId = "message"+messageNr;

    this.getText = function () {
            return this.text;
    };

    this.getVisual = function () {

        let messageNumber = "";

        if (messageNr !== 0) {
                messageNumber = " ~ "+messageNr+" <i class='fa fa-envelope' aria-hidden='true'></i>";
        }

        return "<div class='callout message' id='"+this.messageId+"'>"+this.text+ messageNumber+"</div>";
    }
}