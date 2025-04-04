export const Enums = {
    PackageStatuses: {
        New: 24,
        Paid: 25,
        Posted: 26,
        AssignedToCollect: 27,
        Storage: 29,
        AssignedToDelivery: 30,
        IssuedToDelivery: 32,
        Delivered: 33
    },
    PaymentStatuses: {
        Unpaid: 5,
        Paid: 6
    },
    UserTypes: {
        Client: 1,
        Delivery: 12,
        DeliveryManager: 13,
        Support: 14,
        Admin: 4
    },
    TransportationStatuses: {
        Scheduled: 35,
        Started: 36,
        Finished: 37
    }
}