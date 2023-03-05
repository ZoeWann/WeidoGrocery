
class Ponit {
    Is_Wall: boolean;
    father: Ponit;//父节点
    G: number;// 表示从起点 A 移动到网格上指定方格的移动耗费 (上下左右，还可沿斜方向移动)
    old_G: number;//旧G 第一次：从起点 A 直接移动到 A 四周方格的移动耗费 ；上次更新得到的G 
    new_G: number; //新G  从起点 A 经过当前搜索中心点到其四周指定点的移动耗费 
    H: number;//表示从指定的方格移动到终点 B 的预计耗费 (H 有很多计算方法, 这里我们设定只可以上下左右移动)
    F: number;//表示该点的总耗费
}
var start_Point: Ponit;
var end_Point: Ponit;
var min_Point: Ponit;
var now_Point: Ponit;