
class Point {
    id: number;
    is_wall: boolean;
    father: Point;
    old_gValue: number;   //旧G 第一次：从起点 A 直接移动到 A 四周方格的移动耗费 ；上次更新得到的G
    new_gValue: number;   //新G  从起点 A 经过当前搜索中心点到其四周指定点的移动耗费
    G: number;              // G(x)表示从起点A移动到网格上指定方格x的实际移动代价
    H: number;              //从当前点x移动到终点B的预计代价（H的计算方法不固定，按照问题来修改），即用启发函数来计算当前点x移动到终点B的预计代价。
    F: number;              //F(x)=G(x)+H(x)，即表示当前点x到终点B的总代价
}


class Astar {
    /**起始节点，即 用户请求寻路时的起点 */
    private start_Point: Point;
    /**目标节点/结束节点/终点 即:用户请求寻路的终点/目的地点 */
    private end_Point: Point;
    /**当前节点。即:当前正在分析的节点*/
    private current_Point: Point;
    /**邻接节点。即:当前节点相邻接的节点*/
    private adjacency_Point: Point;
    /**开表，即 待考察节点列表 */
    private open_table: Array<Point> = [];
    /**闭表，即 已考察节点列表 */
    private close_table: Array<Point> = [];
    constructor() {

    }
    clearPoint() {

    }
    findMinPoint(open_table: Array<Point>) {
        let minPoint: Point;
        return minPoint;
    }
    findSurroundPoints(min_Point: Point) {
        let surroundPoints: Point[];
        return surroundPoints;
    }
    findPath(startPoint: Point, endPoint: Point) {
        //清除上一次算法留下的节点与节点之间的父子关系
        this.clearPoint();
        //初始化
        this.open_table = [];
        this.close_table = [];
        //开始时将起点加入开表
        this.open_table.push(startPoint);

        while (this.open_table.length > 0) {
            //寻找open表中F值最小的节点
            let min_Point: Point = this.findMinPoint(this.open_table);

            let idx = this.open_table.findIndex((e) => { e.id == min_Point.id });
            this.open_table.splice(idx);

            this.close_table.push(min_Point);

            //寻找minPoint周围的点 (边界和障碍物不会算在内)
            let surroundPoints: Point[] = this.findSurroundPoints(min_Point);

            //如果surroundPoints中的点 在close表中出现过，则移除这些点
            this.close_table.forEach((p) => {
                if (surroundPoints.includes(p)) {
                    surroundPoints.slice(surroundPoints.indexOf(p));
                }
            })

            

        }
    }
}