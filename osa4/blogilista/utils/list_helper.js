const _ = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    if (!blogs.length) {
        return 0
    } else if (blogs.length === 1) {
        return blogs.map(blog => blog.likes)[0]
    } else {
        return blogs.map(blog => blog.likes).reduce((total, like) => total + like)
    }
}

const favoriteBlog = (blogs) => {
    tykkaykset = blogs.map(blog => blog.likes)
    maksimi = Math.max(...tykkaykset)
    indeksi = tykkaykset.indexOf(maksimi)
    const newBlog = {
        "title": blogs[indeksi].title,
        "author": blogs[indeksi].author,
        "likes": blogs[indeksi].likes
    }
    return newBlog
}

const mostBlogs = (blogs) => {
    authors = blogs.map(blog => blog.author)
    const result = _.head(_(authors)
        .countBy()
        .entries()
        .maxBy(_.last))
    const newObject = {
        author: result,
        blogs: authors.filter(author => author === result).length
    }
    return newObject
}

const mostLikes = (blogs) => {
    likes = blogs.map(blog => blog.likes)
    author = blogs.filter(blog => blog.likes === Math.max(...likes))
    result = blogs.filter(blog => blog.author === author.map(author => author.author)[0])
    const newObject = {
        author: result.map(blog => blog.author)[0],
        likes: result.map(blog => blog.likes).reduce((total, item) => total + item)
    }
    return newObject
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}