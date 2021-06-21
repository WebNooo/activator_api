declare global{
    namespace Express{
        interface Request {
            headers: {
                hwid: String
            }
        }
    }
}