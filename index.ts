class ZooTicket {
  private static ticketCounter: number = 1;
  private ticketNumber: number;
  private numberOfGuests: number;
  private guests: Map<number, number>;
  private totalCharges: number;

  constructor(numberOfGuests: number, guests: Map<number, number>) {
    this.ticketNumber = ZooTicket.ticketCounter++;
    this.numberOfGuests = numberOfGuests;
    this.guests = guests;
    this.totalCharges = this.calculateTotalCharges();
  }

  getTicketNumber(): number {
    return this.ticketNumber;
  }

  displayTicketDetails(): void {
    console.log(`Ticket ${this.ticketNumber} Details:`);
    this.guests.forEach((age, guestNumber) => {
      const guestPrice = this.calculateGuestPrice(age);
      console.log(
        `Guest ${guestNumber} (age: ${age}) - Price: INR ${guestPrice}`
      );
    });
    console.log(`Total Charges: INR ${this.totalCharges}`);
  }

  calculateGuestPrice(age: number): number {
    if (age < 1 || age > 200) {
      throw new Error(`Invalid age: ${age}`);
    }
    if (age <= 2) {
      return 0;
    } else if (age < 18) {
      return 100;
    } else if (age < 60) {
      return 500;
    } else {
      return 300;
    }
  }

  calculateTotalCharges(): number {
    let totalCharges: number = 0;
    this.guests.forEach((age) => {
      totalCharges += this.calculateGuestPrice(age);
    });
    return totalCharges;
  }

  getTotalCharges(): number {
    return this.totalCharges;
  }
}

class ZooTicketingSystem {
  private tickets: Map<number, ZooTicket>;

  constructor() {
    this.tickets = new Map();
  }

  issueTicket(numberOfGuests: number, guests: Map<number, number>): ZooTicket {
    const newTicket: ZooTicket = new ZooTicket(numberOfGuests, guests);
    this.tickets.set(newTicket.getTicketNumber(), newTicket);
    console.log(
      `Ticket issued with Ticket Number : ${newTicket.getTicketNumber()} `
    );
    guests.forEach((age, guestNumber) => {
      const guestPrice = newTicket.calculateGuestPrice(age);
      console.log(
        `Guest ${guestNumber} (age: ${age}) - Price: INR ${guestPrice}`
      );
    });
    console.log(`Total Charges: INR ${newTicket.getTotalCharges()}`);
    return newTicket;
  }

  validateTicket(ticketNumber: number): void {
    const ticket: ZooTicket | undefined = this.tickets.get(ticketNumber);
    if (ticket) {
      console.log(`Ticket ${ticketNumber} is valid.`);
      ticket.displayTicketDetails();
    } else {
      console.log(`Invalid ticket number: ${ticketNumber}`);
    }
  }
}

function main(): void {
  const zooTicketingSystem: ZooTicketingSystem = new ZooTicketingSystem();
  const readlineSync = require("readline-sync");

  while (true) {
    console.log("\n1. Issue Ticket");
    console.log("2. Validate Ticket");
    console.log("3. Exit");

    const choice: number = readlineSync.questionInt("Enter your choice: ");

    if (choice === 1) {
      const numberOfGuests: number = readlineSync.questionInt(
        "Enter the number of guests: "
      );
      const guests: Map<number, number> = new Map();
      for (let i = 1; i <= numberOfGuests; i++) {
        let age: number;
        do {
          age = readlineSync.questionInt(`Enter age of Guest ${i}: `);
          if (age < 1 || age > 200) {
            console.log("Age must be between 1 and 200. Please try again.");
          }
        } while (age < 1 || age > 200);
        guests.set(i, age);
      }
      try {
        zooTicketingSystem.issueTicket(numberOfGuests, guests);
      } catch (error: any) {
        console.error(error.message);
      }
    } else if (choice === 2) {
      const ticketNumber: number = readlineSync.questionInt(
        "Enter ticket number to validate: "
      );
      zooTicketingSystem.validateTicket(ticketNumber);
    } else if (choice === 3) {
      break;
    } else {
      console.log("Invalid choice. Please try again.");
    }
  }
}

main();
