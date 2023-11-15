export interface IHealthCard {
    ci : number,
    issue_date : Date,
    expiration_date : Date,
    receipt : "jpg" | "pdf";
}
