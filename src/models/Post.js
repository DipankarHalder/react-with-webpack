class Post {
  constructor (title, img) {
    this.title = title
    this.img = img
    this.date = new Date()
  }

  _toString () {
    return JSON.stringify({
      title: this.title,
      img: this.img,
      date: this.date.toJSON()
    })
  }

  get _uppercase () {
    return this.title.toUpperCase();
  }
}

export default Post;