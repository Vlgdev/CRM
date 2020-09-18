import localizeFilter from '../filters/localize.filter'

export default {
    'default': localizeFilter('Message_default'),
    'logout': localizeFilter('Message_logout'),
    'login': localizeFilter('Message_login'),
    'auth/wrong-password': localizeFilter('Message_auth/wrong-password'),
    'auth/user-not-found': localizeFilter('Message_auth/user-not-found'),
    'auth/email-already-in-use': localizeFilter('Message_auth/email-already-in-use'),
    'auth/network-request-failed': localizeFilter('Message_auth/network-request-failed')
}