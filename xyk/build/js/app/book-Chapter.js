require(["jquery","render","header","getRequest","bscroll","storage"],function(i,r,e,a,l,o){e({isSearch:!1,title:"目录"});var t=a().fiction_id;i.ajax({url:"/api/chapter",dataType:"json",data:{fiction_id:t},success:function(e){r(e.item.toc,i("#chapter-tpl"),i(".book-chapter>ul"));var o,t=new l(".book-chapter",{scrollY:!0,probeType:2,click:!0}),c=a().chapter_id;o=c||e.item.toc.length,t.scrollToElement(i(".book-chapter>ul li").eq(o-1)[0]),i(".book-chapter>ul li").eq(o-1).addClass("active")},error:function(e){console.log(e)}}),i(".render-header").on("click",".icon-back",function(){history.go(-1)}),i(".book-chapter ul").on("click","li",function(){chapter_id=i(this).index()+1,o.set("chapter_id",chapter_id),window.location.href="../../page/book-Read.html?fiction_id="+t+"&chapter_id="+chapter_id})});