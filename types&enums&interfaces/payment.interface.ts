
enum PaymentStatus {
    PAID = "PAID",
    UNPAID = "UNPAID",
    FAILED = "FAILED"
}

export interface Payment {
    
    id: string;
    user:{
        email: string;
    }
    currency: string;
    amount: number;
    transactionId: string;
    status: PaymentStatus;
    createdAt: Date;
}
