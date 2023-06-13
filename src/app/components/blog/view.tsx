import React from 'react'

export default function ViewBlog({ title }: BlogProp) {
  return (
    <div>
      {title}
    </div>
  )
}

interface BlogProp {
  title: string
}
