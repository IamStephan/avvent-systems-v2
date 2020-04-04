module.exports = async function({ id, email, username }) {
  let count

  if(id) {
    // Check if this works!!
    count = await this.adapter.count({
      query: {
        _id: id
      }
    })
  } else if(email) {
    count = await this.adapter.count({
      query: {
        email
      }
    })
  } else if(username) {
    count = await this.adapter.count({
      query: {
        username
      }
    })
  } else {
    count = 0
  }

  return count > 0
}