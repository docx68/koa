# 关联

Sequelize 支持标准关联关系: [一对一](https://en.wikipedia.org/wiki/One-to-one_(data_model)), [一对多](https://en.wikipedia.org/wiki/One-to-many_(data_model)) 和 [多对多](https://en.wikipedia.org/wiki/Many-to-many_(data_model)).

为此,Sequelize 提供了 **四种** 关联类型,并将它们组合起来以创建关联：

- `HasOne` 关联类型
- `BelongsTo` 关联类型
- `HasMany` 关联类型
- `BelongsToMany` 关联类型

## 定义 Sequelize 关联

四种关联类型的定义非常相似. 假设我们有两个模型 `A` 和 `B`. 告诉 Sequelize 两者之间的关联仅需要调用一个函数：

```js
const A = sequelize.define('A', /* ... */);
const B = sequelize.define('B', /* ... */);

A.hasOne(B); // A 有一个 B
A.belongsTo(B); // A 属于 B
A.hasMany(B); // A 有多个 B
A.belongsToMany(B, { through: 'C' }); // A 属于多个 B , 通过联结表 C
```

关联的定义顺序是有关系的. 换句话说,对于这四种情况,定义顺序很重要. 在上述所有示例中,`A` 称为 **源** 模型,而 `B` 称为 **目标** 模型. 此术语很重要.

`A.hasOne(B)` 关联意味着 `A` 和 `B` 之间存在一对一的关系,外键在目标模型(`B`)中定义.

`A.belongsTo(B)`关联意味着 `A` 和 `B` 之间存在一对一的关系,外键在源模型中定义(`A`).

`A.hasMany(B)` 关联意味着 `A` 和 `B` 之间存在一对多关系,外键在目标模型(`B`)中定义.

`foreignKey` 参数接受一个字符串或一个对象. 当接收到一个对象时,该对象将用作列的定义,就像在标准的 `sequelize.define` 调用中所做的一样. 因此,指定诸如 `type`, `allowNull`, `defaultValue` 等参数就可以了.

```js
import { DataTypes, Model } from "sequelize";
import { db_connect,db_prefix} from '../../common/db_connect.js'
import Goods from "./goods.js";

class Cart extends Model{}

Cart.init(
    {
        goods_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            comment:"商品id"
        },
        user_id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            comment:"用户id"
        },
        number:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:1,
            comment:'购物数量'
        },
        selected:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:true,
            comment:'是否选中状态'
        }
    },
    {
        sequelize:db_connect, 
        modelName: 'Cart' ,
        tableName: `${db_prefix}cart`,
		
        // 启动软删除
        paranoid: true
    }

)

Cart.belongsTo(Goods,{
    foreignKey:'goods_id',
    as:'goods_info'
})

// Cart.sync();

export default Cart;

```

