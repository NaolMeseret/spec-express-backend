let users = []
let currentId = 1

exports.getAllUsers = (req, res) => {
  res.json(users)
}

exports.getUserById = (req, res, next) => {
  const id = Number(req.params.id)
  const user = users.find((u) => u.id === id)

  if (!user) {
    return next({ status: 404, message: "User not found" })
  }

  res.json(user)
}

exports.createUser = (req, res, next) => {
  const { name, email } = req.body

  if (!name) {
    return res.status(400).json({ message: "Name required" })
  }

  const newUser = {
    id: currentId++,
    name,
    email: email || null,
  }

  users.push(newUser)
  res.status(201).json(newUser)
}

exports.updateUser = (req, res, next) => {
  const id = Number(req.params.id)
  const { name, email } = req.body

  const user = users.find((u) => u.id === id)

  if (!user) {
    return next({ status: 404, message: "User not found" })
  }

  if (!name) {
    return res.status(400).json({ message: "Name required" })
  }

  user.name = name
  user.email = email || user.email

  res.json(user)
}

exports.deleteUser = (req, res, next) => {
  const id = Number(req.params.id)
  const index = users.findIndex((u) => u.id === id)

  if (index === -1) {
    return next({ status: 404, message: "User not found" })
  }

  users.splice(index, 1)
  res.json({ message: "User deleted successfully" })
}
