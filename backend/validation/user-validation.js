const descriptor = {
    // Validation rules
    firstname: [
        {
            required: true,
            message: "Firstname is required."
        },
        {
            min: 2,
            message: "Firstname should consist of at least 2 charachters"
        }
    ],
    lastname: [
        {
            required: true,
            message: "Lastname is required."
        },
        {
            min: 2,
            message: "Firstname should consist of at least 2 charachters"
        }
    ]
}

module.exports = descriptor
