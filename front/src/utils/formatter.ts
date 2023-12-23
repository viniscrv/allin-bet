export const priceFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export function formatPriceToNumber(amount: string) {
    return Number(amount.replace(/[^\d,]/g, '').replace(',', '.'));
}