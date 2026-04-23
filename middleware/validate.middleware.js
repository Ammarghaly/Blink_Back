const rules = {
  required: (value) =>
    value !== undefined && value !== null && value.toString().trim() !== "",
  isEmail: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  minLength: (value, min) => typeof value === "string" && value.length >= min,
  maxLength: (value, max) => typeof value === "string" && value.length <= max,
};

const messages = {
  required: (field) => `${field} is required`,
  isEmail: (field) => `${field} must be a valid email address`,
  minLength: (field, param) => `${field} must be at least ${param} characters long`,
  maxLength: (field, param) => `${field} must not exceed ${param} characters`,
};

export const validate = (schema) => (req, res, next) => {
  const errors = {};

  for (const [field, fieldRules] of Object.entries(schema)) {
    const value = req.body[field];
    const fieldErrors = [];

    for (const [rule, param] of Object.entries(fieldRules)) {
      if (rule !== "required" && !rules.required(value)) continue;

      const isValid =
        rule === "required" || rule === "isEmail"
          ? rules[rule](value)
          : rules[rule]?.(value, param);

      if (!isValid) {
        fieldErrors.push(messages[rule](field, param));
        if (rule === "required") break;
      }
    }

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};

export const registerSchema = {
  name: { required: true, minLength: 2, maxLength: 50 },
  email: { required: true, isEmail: true },
  password: { required: true, minLength: 6 },
};

export const loginSchema = {
  email: { required: true, isEmail: true },
  password: { required: true },
};

export const createPostSchema = {
  title: { required: true, minLength: 3, maxLength: 100 },
  content: { required: true, minLength: 10 },
};

export const commentSchema = {
  text: { required: true, minLength: 1, maxLength: 500 },
};
