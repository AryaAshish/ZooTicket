var ZooTicket = /** @class */ (function () {
    function ZooTicket(numberOfGuests, guests) {
        this.ticketNumber = ZooTicket.ticketCounter++;
        this.numberOfGuests = numberOfGuests;
        this.guests = guests;
        this.totalCharges = this.calculateTotalCharges();
    }
    ZooTicket.prototype.getTicketNumber = function () {
        return this.ticketNumber;
    };
    ZooTicket.prototype.displayTicketDetails = function () {
        var _this = this;
        console.log("Ticket ".concat(this.ticketNumber, " Details:"));
        this.guests.forEach(function (age, guestNumber) {
            var guestPrice = _this.calculateGuestPrice(age);
            console.log("Guest ".concat(guestNumber, " (age: ").concat(age, ") - Price: INR ").concat(guestPrice));
        });
        console.log("Total Charges: INR ".concat(this.totalCharges));
    };
    ZooTicket.prototype.calculateGuestPrice = function (age) {
        if (age < 1 || age > 200) {
            throw new Error("Invalid age: ".concat(age));
        }
        if (age <= 2) {
            return 0;
        }
        else if (age < 18) {
            return 100;
        }
        else if (age < 60) {
            return 500;
        }
        else {
            return 300;
        }
    };
    ZooTicket.prototype.calculateTotalCharges = function () {
        var _this = this;
        var totalCharges = 0;
        this.guests.forEach(function (age) {
            totalCharges += _this.calculateGuestPrice(age);
        });
        return totalCharges;
    };
    ZooTicket.prototype.getTotalCharges = function () {
        return this.totalCharges;
    };
    ZooTicket.ticketCounter = 1;
    return ZooTicket;
}());
var ZooTicketingSystem = /** @class */ (function () {
    function ZooTicketingSystem() {
        this.tickets = new Map();
    }
    ZooTicketingSystem.prototype.issueTicket = function (numberOfGuests, guests) {
        var newTicket = new ZooTicket(numberOfGuests, guests);
        this.tickets.set(newTicket.getTicketNumber(), newTicket);
        console.log("Ticket issued with Ticket Number : ".concat(newTicket.getTicketNumber(), " "));
        guests.forEach(function (age, guestNumber) {
            var guestPrice = newTicket.calculateGuestPrice(age);
            console.log("Guest ".concat(guestNumber, " (age: ").concat(age, ") - Price: INR ").concat(guestPrice));
        });
        console.log("Total Charges: INR ".concat(newTicket.getTotalCharges()));
        return newTicket;
    };
    ZooTicketingSystem.prototype.validateTicket = function (ticketNumber) {
        var ticket = this.tickets.get(ticketNumber);
        if (ticket) {
            console.log("Ticket ".concat(ticketNumber, " is valid."));
            ticket.displayTicketDetails();
        }
        else {
            console.log("Invalid ticket number: ".concat(ticketNumber));
        }
    };
    return ZooTicketingSystem;
}());
function main() {
    var zooTicketingSystem = new ZooTicketingSystem();
    var readlineSync = require("readline-sync");
    while (true) {
        console.log("\n1. Issue Ticket");
        console.log("2. Validate Ticket");
        console.log("3. Exit");
        var choice = readlineSync.questionInt("Enter your choice: ");
        if (choice === 1) {
            var numberOfGuests = readlineSync.questionInt("Enter the number of guests: ");
            var guests = new Map();
            for (var i = 1; i <= numberOfGuests; i++) {
                var age = void 0;
                do {
                    age = readlineSync.questionInt("Enter age of Guest ".concat(i, ": "));
                    if (age < 1 || age > 200) {
                        console.log("Age must be between 1 and 200. Please try again.");
                    }
                } while (age < 1 || age > 200);
                guests.set(i, age);
            }
            try {
                zooTicketingSystem.issueTicket(numberOfGuests, guests);
            }
            catch (error) {
                console.error(error.message);
            }
        }
        else if (choice === 2) {
            var ticketNumber = readlineSync.questionInt("Enter ticket number to validate: ");
            zooTicketingSystem.validateTicket(ticketNumber);
        }
        else if (choice === 3) {
            break;
        }
        else {
            console.log("Invalid choice. Please try again.");
        }
    }
}
main();
