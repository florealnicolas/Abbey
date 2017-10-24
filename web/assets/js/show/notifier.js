function Notifier () {

    this.messageList = new List();

    this.installMessageBoard = function () {

        const message = "Good morning sunshine!";
        this.notifySomething(message);
    };

    this.notifySomething = function (message) {

        let verb = "says";

        const foundPunctuationMarks = this.getImportantPunctuationMarksInOrder(message);
        const questionMark = foundPunctuationMarks.includes("?");

        if (foundPunctuationMarks.length !== 0) {
            if (questionMark) {
                verb = "asks";
            }

            else {
                verb = "shouts";
            }
        }

        const notification = new Message("Maurits " + verb + ": \"" + message + "\"", this.messageList.getSize() + 1);

        this.messageList.addAnItem(notification);

        this.showNotification();
    };

    this.showNotification = function () {

        const notifier = this;

        let lastNotification = new Message("Currently there is nothing new.", this.messageList.getSize());

        if (this.messageList.getSize() !== 0) {
            lastNotification = this.messageList.getItemByNumber(this.messageList.getSize() - 1);
        }

        const messageBoard = $("#messageBoard");
        messageBoard.html(lastNotification.getVisual());
        messageBoard.show();

        $(".message").on("click", function() {
            $(this).hide();

            const messageId = eval(this.id.split("message")[1]);

            notifier.messageList.removeAnItem(messageId);

            console.log("CLICKED A NOTIFICATION AWAY! MESSAGE NR", messageId);

            notifier.showNotification();
        })
    };

    this.getImportantPunctuationMarksInOrder = function (message) {

        const importantPunctuationMarks = ["?", "!"];
        let foundPunctuationMarks = [];

        const letterArray = message.split("");

        letterArray.forEach(function (letter) {

            if (importantPunctuationMarks.includes(letter)) {
                foundPunctuationMarks.push(letter);
            }
        });

        return foundPunctuationMarks;

    }
}