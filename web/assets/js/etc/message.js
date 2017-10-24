function Message (messageText, messageNr) {

    this.text = messageText;
    this.messageId = "message"+messageNr;

    this.getText = function () {
            return this.text;
    };

    this.getVisual = function () {

        let messageNumber = "";

        if (messageNr !== 0) {
                messageNumber = " [Message "+messageNr+"]";
        }

        return "<div class='callout message' id='"+this.messageId+"'>"+this.text+ messageNumber+"</div>";
    }
}