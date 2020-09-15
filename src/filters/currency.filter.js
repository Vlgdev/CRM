export default function currencyFilter(val, currency = 'RUB') {
    return new Intl.NumberFormat('ru-RU', { 
        currency, style: 'currency'
     }).format(val)
}