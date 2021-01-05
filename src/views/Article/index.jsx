import React, { useState, useEffect } from "react";

import { withRouter } from "react-router-dom";

import {
  Button,
  message,
  Table,
  Switch,
  Space,
  Spin,
  Alert,
  Modal,
  Image,
  Tag,
} from "antd";

import { connect } from "react-redux";
// 请求
import {
  getBlogInfo,
  editTopShowTop,
  deleteBlogInfo,
} from "../../requests/admin";

import { Box } from "../../components";

import "./index.less";

function Article(props) {
  // const [blogInfo, setBlogInfo] = useState([])
  const [data, setdata] = useState(undefined);
  const [visible, setvisible] = useState(false);
  const [deleteTitle, setdeleteTitle] = useState("");
  const [confirmLoading, setconfirmLoading] = useState(false);
  const [deleteID, setdeleteID] = useState("");
  // 分页
  const [pagination, setPagination] = useState({
    // current: 1,
    pageSize: 10,
  });

  /*   useEffect(() => {
    let allData;
    let timer = null;

    if (!props.login.isLogin) {
      // message.warning("请重新登录！");
      timer = setTimeout(() => {
        props.history.push("/login");
      }, 3000);
    }

    // 编辑按钮
    const editBlog = (id) => {
      props.history.push(`/admin/edit/${id}`);
    };

    // 删除按钮
    const deleteBlog = async (id) => {
      setvisible(true);
      setdeleteID(id);
      let thisBlogTitle = allData.find((item) => {
        if (item.key === id) {
          return true;
        }
        return false;
      });
      await setdeleteTitle(thisBlogTitle.title);

      //  deleteBlogInfo(id).then(res => {
      //   console.log(res)
      // })
    };

    // 修改 isShouTop 状态
    const changeShowTop = (id) => {
      editTopShowTop(id).then((res) => {
        // if (res.status === 200) {
        //   setdata(res.data);
        // }
        let newData = allData.map((item, index) => {
          if (item.key === id) {
            return {
              ...item,
              isShowTop: !item.isShowTop,
            };
          }
          return item;
        });
        setdata(newData);
      });
    };

    // 从后端获取数据
    const getData = () => {
      getBlogInfo().then((res) => {
        let blog = Object.assign({}, res);
        if (blog.status === 200) {
          let column = blog.data[0];
          let columns1 = Object.keys(column);
          // console.log(columns1);
          let newColumns = columns1.filter((item) => {
            if (
              item !== "_id" &&
              item !== "content" &&
              item !== "__v" &&
              item !== "tags"
            ) {
              return true;
            }
            return false;
          });
          newColumns.push("tags");
          newColumns.push("edit");
          newColumns.unshift("id");

          // data 数据
          allData = blog.data.map((item, index) => {
            return {
              id: ++index,
              key: item._id,
              title: item.title,
              author: item.author,
              descriptionPicture: item.descriptionPicture,
              time: item.time,
              isShowTop: item.isShowTop,
              tags: item.tags,
              visits: item.visits,
            };
          });
          setdata(allData);

          // columns 数据
          let newData = newColumns.map((item, index) => {
            // 置顶
            if (item === "isShowTop") {
              return {
                title: item,
                key: item,
                dataIndex: item,
                render: (switchs, record) => {
                  return (
                    <div>
                      <Switch
                        defaultChecked={false}
                        checked={switchs}
                        onChange={changeShowTop.bind(this, record.key)}
                      />
                    </div>
                  );
                },
              };

              // 描述图片
            } else if (item === "descriptionPicture") {
              return {
                title: item,
                key: item,
                dataIndex: item,
                render: (text, record) => {
                  return (
                    <div className="descriptionPicture">
                      <Image src={text} />
                    </div>
                  );
                },
              };
              // 标签
            } else if (item === "tags") {
              return {
                title: item,
                key: item,
                dataIndex: item,
                render: (tags, record) => {
                  return tags.map((tag) => {
                    return (
                      <Tag key={tag.tagName} color={tag.tagColor}>
                        {tag.tagName}
                      </Tag>
                    );
                  });
                },
              };
              // 编辑
            } else if (item === "edit") {
              return {
                title: item,
                key: item,
                dataIndex: item,
                render: (text, record) => {
                  return (
                    <div>
                      <Modal
                        title="是否删除该博客"
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        confirmLoading={confirmLoading}
                        okText={confirmLoading ? "正在删除中" : "确定"}
                      >
                        标题：<span>{deleteTitle}</span>
                      </Modal>
                      <Space size="middle">
                        <Button
                          type="primary"
                          onClick={editBlog.bind(this, record.key)}
                        >
                          编辑
                        </Button>
                        <Button
                          danger
                          onClick={deleteBlog.bind(this, record.key)}
                        >
                          删除
                        </Button>
                      </Space>
                    </div>
                  );
                },
              };
            }
            return {
              title: item,
              key: item,
              dataIndex: item,
            };
          });
          setcolumns(newData);
        } else {
          message.error(res.msg);
        }
      });
    };
    getData();

    // 消除副作用
    return () => {
      clearTimeout(timer);
      // setdata(undefined)
    };
  }, [
    props.history,
    props.login.isLogin,
    props,
    confirmLoading,
    deleteTitle,
    visible,
  ]);

  // Model 取消按钮
  const handleCancel = () => {
    setvisible(false);
  };

  // Model 确定按钮
  function handleOk() {
    let id = deleteID;
    setconfirmLoading(true);
    deleteBlogInfo(id).then((res) => {
      if (res.status === 200) {
        setconfirmLoading(false);
        message.success("删除成功！");
        setvisible(false);
        let deleteID = data.findIndex((item) => {
          if (item.key === id) {
            return true;
          }
          return false;
        });
        data.splice(deleteID, 1);
        setdata(data);
        return;
      }
      setconfirmLoading(false);
      message.error("删除失败！");
      setvisible(false);
      return;
    });
  } */
  useEffect(() => {
    // 请求数据
    getBlogInfo().then((res) => {
      if (res.status === 200) {
        let newData = res.data.map((data) => {
          return {
            ...data,
            key: data.id.toString(),
          };
        });
        setdata(newData);
      }
    });
  }, []);

  // 点击编辑事件
  // 编辑按钮
  const editBlog = (id) => {
    props.history.push(`/admin/edit/${id}`);
  };

  // 修改 isShouTop 状态
  const changeShowTop = (id) => {
    editTopShowTop(id).then((res) => {
      // if (res.status === 200) {
      //   setdata(res.data);
      // }
      let newData = data.map((item, index) => {
        if (item._id === id) {
          return {
            ...item,
            isShowTop: !item.isShowTop,
          };
        }
        return item;
      });
      setdata(newData);
    });
  };

  // 删除按钮
  const deleteBlog = async (id) => {
    setvisible(true);
    setdeleteID(id);
    let thisBlogTitle = data.find((item) => {
      if (item._id === id) {
        return true;
      }
      return false;
    });
    await setdeleteTitle(thisBlogTitle.title);

    //  deleteBlogInfo(id).then(res => {
    //   console.log(res)
    // })
  };

  // Model 取消按钮
  const handleCancel = () => {
    setvisible(false);
  };

  // Model 确定按钮
  const handleOk = () => {
    let id = deleteID;
    setconfirmLoading(true);
    deleteBlogInfo(id).then((res) => {
      if (res.status === 200) {
        setconfirmLoading(false);
        message.success("删除成功！");
        setvisible(false);
        let deleteID = data.findIndex((item) => {
          if (item._id === id) {
            return true;
          }
          return false;
        });
        let deleteDataAfter = data.filter(data => !data._id === id);
        // data.splice(deleteID, 1);
        setdata(deleteDataAfter);
        return;
      }
      setconfirmLoading(false);
      message.error("删除失败！");
      setvisible(false);
      return;
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "描述图片",
      dataIndex: "descriptionPicture",
      key: "descriptionPicture",
      render: (text) => (
        <div className="descriptionPicture">
          <Image src={text} />
        </div>
      ),
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "时间",
      dataIndex: "time",
      key: "time",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "是否置顶",
      dataIndex: "isShowTop",
      key: "isShowTop",
      render: (text, record) => (
        <Switch
          defaultChecked={false}
          checked={text}
          onChange={changeShowTop.bind(this, record._id)}
        />
      ),
    },
    {
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      render: (tags, record) => {
        return tags.map((tag) => {
          return (
            <Tag key={tag.tagName} color={tag.tagColor}>
              {tag.tagName}
            </Tag>
          );
        });
      },
    },
    {
      title: "操作",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => {
        return (
          <div>
            <Modal
              title="是否删除该博客"
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}
              // confirmLoading={confirmLoading}
              // okText={confirmLoading ? "正在删除中" : "确定"}
            >
              {/* 标题：<span>{deleteTitle}</span> */}
            </Modal>
            <Space size="middle">
              <Button type="primary" onClick={editBlog.bind(this, record._id)}>
                编辑
              </Button>
              <Button danger onClick={deleteBlog.bind(this, record._id)}>
                删除
              </Button>
            </Space>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Box>
        {/* {data ? ( */}
        <div>
          <Table columns={columns} dataSource={data} pagination={pagination} />
        </div>
        {/* ) : (
          <Spin tip="Loading...">
            <Alert className="LoadingAlert" type="info" />
          </Spin>
        )} */}
      </Box>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

export default connect(mapStateToProps)(withRouter(Article));
