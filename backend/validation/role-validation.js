const descriptor = {
    // Validation rules
    roleName: [
        {
            required: true,
            message: "Role Name is required."
        }
    ],
    roleCode: [
        {
            required: true,
            message: "Role Code is required."
        }
    ]
}

module.exports = descriptor
