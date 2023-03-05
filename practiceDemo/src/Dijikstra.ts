/**
 * 选择特殊路径长度最短的路径，将其连接的V-S中的顶点加入到集合S中，同时更新数组dist[]。一旦S包含了所有顶点，dist[]就是从源到所有其他顶点的最短路径长度。
（1）数据结构。 设置地图的带权邻接矩阵为map[][]，即如果从源点u到顶点i有边，就令map[u][i]=<u,i>的权值，否则map[u][i]=∞；
              采用一维数组dist[i]来记录从源点到i顶点的最短路径长度：采用一维数组p[i]来记录最短路径上i顶点的前驱。
（2）初始化。令集合S={u}，对于集合V-S中的所有顶点x，初始化dist[i]=map[u][i],如果源点u到顶点i有边相连，初始化p[i]=u(i的前驱是u),否则p[i]=-1
（3）找最小。在集合V-S中依照贪心策略来寻找使得dist[j]具有最小值的顶点t,即dist[t]=min，则顶点t就是集合V-S中距离源点u最近的顶点。
（4）加入S战队。将顶点t加入集合S，同时更新V-S
（5）判结束。如果集合V-S为空，算法结束，否则转6
（6）借东风。在（3）中已近找到了源点到t的最短路径，那么对集合V-S中所有与顶点t相邻的顶点j，都可以借助t走捷径。
            如果dist[j]>dist[t]+map[t][j],则dist[j]=dist[t]+map[t][j]，记录顶点j的前驱为t，p[j]=t，转（3）。
            //我自己在这里理解就是，从u找到与它最近的点t，在从t找到与它最近的点j，在....按照这样持续下去，直到最后一个点
    这里我再通俗的解释下这个借东风的意思。
    源点为1，如果我们找到了距离源点最近的点2，且点2与3,4相连。
        这样，我们如果要倒3,4有两种方法：
                1->2->3(4)
                1->3(4)
        这里我们就要判断是从1直接到3(4)快，还是经过2后快。假设<1,2>=2 / <2,3>=3 / <1,3>=4
            根据上面的数据，我们第一次找最小找到的是2结点，如果我们直接把2替换掉1当做源点继续找下一个最近的点，这种方法是错的。
            因为可以看出1->3只用4，而过2的话要用5。
 */



const INF = 1e7;            //无穷大
const N: number = 10;      //城市顶点个数
const M: number = 10;      //城市间路线的条数
var map: number[][] = [];        //地图带权邻接矩阵
var dist: number[] = [];         //记录源点u到某顶点的最短路径长度
var pre: number[] = [];          //记录源点到某顶点的最短路径上的该顶点的前一个顶点（前驱）
var flag: boolean[] = [];        //说明顶点i已经加入到集合S，否则该顶点属于集合V-S;
var u: number = 3;          //源点u

// 初始化地图
for (let i = 0; i <= N; i++) {
    map.push(new Array<number>);
    for (let j = 0; j <= N; j++) {
        map[i].push(INF);
    }
}

function initMapData() {
    //初始化地图数据
    for (let i = 0; i <= N; i++) {
        for (let j = 0; j <= i; j++) {
            map[i][j] = (Math.random() > 0.3 ? INF : Math.round(Math.random() * 100));
            if (i == 0 || j == 0) {
                map[i][j] = i == 0 ? j : i;
            }
            if (i == j) {
                map[i][j] = 0;
            }
            map[j][i] = map[i][j];
        }
    }
}

function printMap(map: number[][]) { //打印地图
    for (let i = 0; i <= N; i++) {
        if (i == 0)
            console.log("--------------------------------------------------------------------");
        let str = "| ";
        for (let j = 0; j <= N; j++) {
            str += (map[i][j] == INF ? "INF" : map[i][j].toLocaleString('zh', { minimumIntegerDigits: 3, useGrouping: false })) + " | ";
        }
        console.log(str);
        console.log("--------------------------------------------------------------------");
    }
}


/**
 * 迪杰斯特拉算法 解决带权图的单源最短路径问题
 * @param u 
 * @returns 
 */
function Dijkstra(u: number) {

    for (let i = 1; i <= N; i++) {
        flag[i] = false;
        dist[i] = map[u][i];    //初始化源点u到其他各个顶点的最短路径长度
        if (dist[i] == INF) {
            pre[i] = -1;        //说明源点u与顶点i无边相连
        } else {
            pre[i] = u;         //说明源点u与顶点i有边相连
        }
    }

    //第三步 初始化集合S,令集合S={u},从源点u的最短路径为0
    flag[u] = true;//初始化集合S中，只有一个元素：源点u
    dist[u] = 0;	//初始化源点u的最短路径为0，自己到自己的最短路径
    pre[u] = -1;

    for (let i = 1; i <= N; i++) {
        let temp = INF, t = u;
        //(4)找最小.在集合V-S中寻找距离源点u最近的顶点t,若找不到，则跳出循环;否则，将t加入集合S。
        for (let j = 1; j <= N; j++) {
            if (!flag[j] && dist[j] < temp) {   //先找离源点u最近的点t
                t = j;
                temp = dist[j];
            }
        }
        if (t == u) return; //没找到就返回
        flag[t] = true;

        //(5)借东风。考察集合V-S中源点u到t的邻接点j的距离，如果源点u经过t到达j的路径更短，
        //	则更新dist[j]=dist[t]+map[t][j],即松弛操作，并记录j的前驱为t;
        for (let j = 1; j <= N; j++) {//更新集合V-S中与t邻接的顶点到u的距离
            if (!flag[j] && map[t][j] < INF) {    // t与j邻接
                if (dist[j] > (dist[t] + map[t][j])) {
                    dist[j] = dist[t] + map[t][j];
                    pre[j] = t;
                }
            }
        }
    }
}

function printShortestDist() {
    for (let i = 1; i <= N; i++) {
        console.log(`小明${u} 要去的位置: ${i}`);
        if (dist[i] == INF) {
            console.log("Sorry,No Path");
        } else {
            console.log(`最短距离为:${dist[i]}`);
            printPath(i);
        }
    }
}

function printPath(j: number) {
    let str = "";
    while (pre[j] != -1) {
        str = `${pre[j]}---->${j} weight:${map[pre[j]][j]}\n` + str;
        j = pre[j];
    }
    console.log(str);
}

function main() {
    initMapData();
    printMap(map);
    Dijkstra(u);
    printShortestDist();
}
main();