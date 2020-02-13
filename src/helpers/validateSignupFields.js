export default function(fields) {
    console.log("fields: ", fields);
    let errors = {};
    const validationSchema = {
        firstname: {
            message: "Firstname is required",
            isValid: function(value) {
                if (value.trim() === "") return false;
                let regex = new RegExp("^[a-zA-Z]{3,50}$");
                return regex.test(value);
            }
        },
        lastname: {
            message: "Lastname is required",
            isValid: function(value) {
                if (value.trim() === "") return false;
                let regex = new RegExp("^[a-zA-Z]{3,50}$");
                return regex.test(value);
            }
        },
        email: {
            message: "Email field is required",
            isValid: function(value) {
                if (value.trim() === "") return false;
                let regex = new RegExp("^[a-zA-Z0-9_.-]{2,}@[a-zA-Z0-9]{2,}.[a-zA-Z0-9]{2,}$");
                return regex.test(value);
            }
        },
        nickname: {
            message: "Nickname field is required",
            isValid: function(value) {
                if (value.trim() === "") return false;
                let regex = new RegExp("$[a-zA-Z0-9_]{3,}$");
                return regex.test(value);
            }
        },
        password: {
            message: "Password field is required",
            isValid: function(value) {
                if (value.trim() === "") return false;
                let regex = new RegExp("^[a-zA-Z0-9]{8,30}$");
                return regex.test(value);
            }
        },

        cpassword: {
            message: "Passwords do not match",
            isValid: function(value) {
                console.log(fields["password"]);
                return value === fields["password"];
            }
        }
    };

    // loop through the fields
    for (const value in fields) {
        let field = validationSchema[value];
        let check = field.isValid(fields[value]);
        if (!check) {
            errors[value] = field.message;
        } else {
            errors[value] = null;
        }
    }

    return errors;
}
