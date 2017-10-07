1.选择<body>中所有的<p>，选择集保存在变量 p 中
		var p = d3.select("body").selectAll("p").text("www.ourd3js.com");
		p.style("color","red").style("font-size","72px");
2.在 D3 中，用于选择元素的函数有两个：
  d3.select()：是选择所有指定元素的第一个
  d3.selectAll()：是选择指定元素的全部
3.var svg = body.select("svg");   //选择body中的svg元素
  var rects = svg.selectAll("rect");  //选择svg中所有的svg元素
4.D3 中是通过以下两个函数来绑定数据的：
	datum()：绑定一个数据到选择集上
	data()：绑定一个数组到选择集上，数组的各项值分别与选择集的各元素绑定
5.插入元素
    插入元素涉及的函数有两个：
	append()：在选择集末尾插入元素
	insert()：在选择集前面插入元素
6.删除元素
	删除元素使用 remove，例如：
	var p = body.select("#myid");
	p.remove();
	如此即可删除指定 id 的段落元素。
7.SVG 是什么
	SVG，指可缩放矢量图形（Scalable Vector Graphics），是用于描述二维矢量图形的一种图形格式，是由万维网联盟制定的开放标准。SVG 使用 XML 格式来定义图形，除了 IE8 之前的版本外，绝大部分浏览器都支持 SVG，可将 SVG 文本直接嵌入 HTML 中显示。
	SVG 有如下特点：
		SVG 绘制的是矢量图，因此对图像进行放大不会失真
		基于 XML，可以为每个元素添加 JavaScript 事件处理器
		每个图形均视为对象，更改对象的属性，图形也会改变
		不适合游戏应用
8.Canvas 是什么
	Canvas 是通过 JavaScript 来绘制 2D 图形，是 HTML 5 中新增的元素。
	Canvas 有如下特点：
		绘制的是位图，图像放大后会失真
		不支持事件处理器
		能够以 .png 或 .jpg 格式保存图像
		适合游戏应用
9.svg.selectAll("rect")   //选择svg内所有的矩形
    .data(dataset)  //绑定数组
    .enter()        //指定选择集的enter部分
    .append("rect") //添加足够数量的矩形元素

    这段代码以后会常常出现在 D3 的代码中，请务必牢记。目前不深入讨论它的作用机制是怎样的，只需要读者牢记，当：
	有数据，而没有足够图形元素的时候，使用此方法可以添加足够的元素。
	添加了元素之后，就需要分别给各元素的属性赋值。在这里用到了 function(d, i)，
    前面已经讲过，d 代表与当前元素绑定的数据，i 代表索引号。给属性赋值的时候，是需要用到被绑定的数据，以及索引号的。
10. 线性比例尺：线性比例尺，能将一个连续的区间，映射到另一区间。要解决柱形图宽度的问题，就需要线性比例尺。
		假设有以下数组：
		var dataset = [1.2, 2.3, 0.9, 1.5, 3.3];
		现有要求如下。
		将 dataset 中最小的值，映射成 0；将最大的值，映射成 300。
		代码如下：
		var min = d3.min(dataset);
		var max = d3.max(dataset);

		var linear = d3.scale.linear()
		        .domain([min, max])
		        .range([0, 300]);
		linear(0.9);    //返回 0
		linear(2.3);    //返回 175
		linear(3.3);    //返回 300
		其中，d3.scale.linear() 返回一个线性比例尺。domain() 和 range() 分别设定比例尺的定义域和值域。在这里还用到了两个函数，它们经常与比例尺一起出现：
		d3.max()
		d3.min()
		这两个函数能够求数组的最大值和最小值，是 D3 提供的。按照以上代码，

		比例尺的定义域 domain 为：[0.9, 3.3]
		比例尺的值域 range 为：[0, 300]
		因此，当输入 0.9 时，返回 0；当输入 3.3 时，返回 300。当输入 2.3 时呢？返回 175，这是按照线性函数的规则计算的。
		有一点请大家记住：
		d3.scale.linear() 的返回值，是可以当做函数来使用的。因此，才有这样的用法：linear(0.9)。
11.序数比例尺
		有时候，定义域和值域不一定是连续的。例如，有两个数组：
		var index = [0, 1, 2, 3, 4];
		var color = ["red", "blue", "green", "yellow", "black"];
		我们希望 0 对应颜色 red，1 对应 blue，依次类推。
		但是，这些值都是离散的，线性比例尺不适合，需要用到序数比例尺。
		var ordinal = d3.scale.ordinal()
		        .domain(index)
		        .range(color);
		ordinal(0); //返回 red
		ordinal(2); //返回 green
		ordinal(4); //返回 black
		用法与线性比例尺是类似的。
12.d3.svg.axis()：D3 中坐标轴的组件，能够在 SVG 中生成组成坐标轴的元素。
	scale()：指定比例尺。
	orient()：指定刻度的朝向，bottom 表示在坐标轴的下方显示。
	ticks()：指定刻度的数量。