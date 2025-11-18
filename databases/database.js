var user = [
    {
      "id": 1,
      "forename": "Roy",
      "surname": "Fielding"
    },
    {
      "id": 2,
      "forename": "Tim",
      "surname": "Berners-Lee"
    }
  ]

export const getAllUser = () => user

export const getUserById = (id) => user.find(item => item.id === id)

export const createUser = (item) => {
  const newId = user.length > 0 ? Math.max(...user.map(i => i.id)) + 1 : 1
  const newItem = { id: newId, ...item }
  user.push(newItem)
}

export const updateUser = (id, newItem) => {
  const index = user.findIndex(i => i.id === id)
  if (index === -1) throw new Error('Item not found')
  user[index] = { id, ...newItem }
}

export const deleteUser = (id) => {
  const index = user.findIndex(i => i.id === id)
  if (index === -1) throw new Error('Item not found')
  user.splice(index, 1)
}

export const searchUser = (term) => {
  if (!term) return user
  return user.filter(i =>
    i.forename &&
    i.forename.toLowerCase().includes(term.toLowerCase())
  )
}