import React, { useEffect } from 'react'
import BlogDetail from '../../components/blog-detail/BlogDetail'
import UseStatisticTracker from '../../common/useStatisticTracker/UseStatisticTracker';
import { useParams } from 'react-router-dom';

function BlogDetailPage({ setShow }) {
  const params = useParams()
  UseStatisticTracker({
    blog_id: params?.id
    ,
  });
  return (
    <>
      <BlogDetail /></>
  )
}

export default BlogDetailPage