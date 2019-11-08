export class Thing {
    id: number;
    thing_name: string;
    supplier_id: number;
    details: string;
    start_x: number;
    start_y: number;
    offer_date: number;
    start_dir: number;
    status: string;
    recipient_id: number;
    dest_x: number;
    dest_y: number;
    order_date: string;
    delivery_date: string;
    warehouse_x: number = -1;
    warehouse_y: number = -1;


    constructor(id: number, thing_name: string, supplier_id: number, details: string, start_x: number, start_y: number, offer_date: number, start_dir: number, status: string, recipient_id: number, dest_x: number, dest_y: number, order_date: string, delivery_date: string, warehouse_x: number, warehouse_y: number) {
        this.id = id;
        this.thing_name = thing_name;
        this.supplier_id = supplier_id;
        this.details = details;
        this.start_x = start_x;
        this.start_y = start_y;
        this.offer_date = offer_date;
        this.start_dir = start_dir;
        this.status = status;
        this.recipient_id = recipient_id;
        this.dest_x = dest_x;
        this.dest_y = dest_y;
        this.order_date = order_date;
        this.delivery_date = delivery_date;
        this.warehouse_x = warehouse_x;
        this.warehouse_y = warehouse_y;
    }

    asdMethod() {
        console.log("it works");
    }

    static parseData(data: any[]): Thing[] {
        let things: Thing[] = [];
        data.forEach((plainThing) => {
            things.push(new Thing(
                Number(plainThing.id),
                plainThing.thing_name,
                Number(plainThing.supplier_id),
                plainThing.details,
                Number(plainThing.start_x),
                Number(plainThing.start_y),
                plainThing.offer_date,
                (plainThing.start_dir == "horizontal") ? 0 : 1,
                plainThing.status,
                Number(plainThing.recipient_id),
                Number(plainThing.dest_x),
                Number(plainThing.dest_y),
                plainThing.order_date,
                plainThing.delivery_date,
                Number(plainThing.warehouse_x),
                Number(plainThing.warehouse_y)
            ));

        });

        return things;
    }

    isOrdered() {
        return this.dest_x && this.dest_y && this.dest_x >= 0 && this.dest_y >= 0;
    }
}