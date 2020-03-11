/*使用 mongoose 操作 mongodb 的测试文件
 1. 连接数据库
  1.1. 引入 mongoose
  1.2. 连接指定数据库(URL 只有数据库是变化的)
  1.3. 获取连接对象
  1.4. 绑定连接完成的监听(用来提示连接成功)
2. 得到对应特定集合的 Model
  2.1. 字义 Schema(描述文档结构)
  2.2. 定义 Model(与集合对应, 可以操作集合)
3. 通过 Model 或其实例对集合数据进行 CRUD 操作
  3.1. 通过 Model 实例的 save()添加数据
  3.2. 通过 Model 的 find()/findOne()查询多个或一个数据
  3.3. 通过 Model 的 findByIdAndUpdate()更新某个数据
  3.4. 通过 Model 的 remove()删除匹配的数据 */

// 1.1. 引入 mongoose
const mongoose= require('mongoose')
// 1.2. 连接指定数据库(URL 只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/gzhipin_test2')
// 1.3. 获取连接对象
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected', function () { console.log('数据库连接成功') })


// 2. 得到对应特定集合的 Model
// 2.1. 字义 Schema(描述文档结构)
const userSchema = mongoose.Schema({ username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true}, })

// 2.2. 定义 Model(与集合对应, 可以操作集合)
const UserModel = mongoose.model('user', userSchema) // 集合名: users


// 3.1. 通过 Model 实例的 save()添加数据
const md5 = require('blueimp-md5')
function testSave() {
  // user 数据对象
  const user = { username: 'bbbbbb', password: md5('1234'), type: '老板3', }
  const userModel = new UserModel(user) // 保存到数据库
  userModel.save(function (err, user) { console.log('save', err, user) })
}
testSave()

//3.2通过model的 findOne()/find（）查询数据
function testFind(){
  UserModel.find(function (error,users) {
    console.log('find',error,users)
  })
  UserModel.findOne({_id:'5e25c69ef7108e12443890fd'},function (error,user) {
    console.log('find',error,user)
  })
}
//testFind()