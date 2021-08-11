import { ShapeProperties } from "./constants";
import * as d3 from "d3";

export class SRect {
    svgEl: any;
    shapeName: string = "rect";
    autoIncrement: number = 100;
    dragBehaviour: any;
    MIN_RECT_WIDTH = 100;
    MIN_RECT_HEIGHT = 100;
    SMALL_RADIUS = 5;
    LARGE_RADIUS = 10;

    constructor(svgEl: any) {
        this.svgEl = svgEl;
    }

    generateUniqueId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    getDefaultProps() {
        let props: ShapeProperties;

        props = {
            x: Math.floor(Math.random() * 101),
            y: Math.floor(Math.random() * 101),
            width: 100,
            height: 100,
            color: this.getRandomColor(),
            gTranslate: {
                x: 50,
                y: 50
            },
            selection: {
                text: {
                    left: 0,
                    top: 0,
                    width: 0,
                    height: 0
                }
            },
            uniqueid: this.generateUniqueId()
        }
        return props;
    }

    shape(props: ShapeProperties) {
        console.log(props);
        const data = [
            {
                x: props.x,
                y: props.y,
                width: props.width,
                height: props.height
            }
        ]

        var g = this.svgEl;
        var that = this;
        var rects = g.selectAll("g.rectangle" + props.uniqueid)
            .data(data, function (d: any) {
                return d;
            });
        rects.exit().remove();

        let newRects = rects
            .enter().append("g")
            .classed("rectangle" + props.uniqueid, true);

        newRects.append(this.shapeName)
            .attr("fill", props.color)
            .classed("bg", true)
            .on("mouseenter", function () {
                d3.select(this).attr("stroke", "lightblue")
                d3.select(this).attr("stroke-width", "5")
                d3.select(this).attr("cursor", "pointer")
                d3.select("circle.bottomright").attr("fill", "lightblue")
            })
            .on("mouseleave", function () {
                d3.select(this).attr("stroke", null)
                d3.select(this).attr("stroke-width", null)
                d3.select(this).attr("cursor", "default")
            })
            .call(
                d3.drag().container(g.node())
                    .on("start end", function (event) {
                        d3.select(this).classed("moving", event.type === "start");
                    })
                    .on("drag", (event) => {
                        props.x = event.x
                        props.y = event.y
                        that.shape(props);
                    })
            );
        newRects.append("g").classed("circles", true).each(
            function () {
                let circleG = d3.select(this);
                circleG.append("circle")
                    .attr("r", that.SMALL_RADIUS)
                    .attr("fill", "lightblue")
                    .classed("topleft", true)
                    .on("mouseenter mouseleave", function (event: Event) {
                        let el = d3.select(this), isEntering = event.type === "mouseenter";
                        el.attr("cursor", "crosshair");
                        el.classed("hovering", isEntering).attr("r",
                            isEntering || el.classed("resizing") ?
                                that.LARGE_RADIUS : that.SMALL_RADIUS)

                    })
                    .call(d3.drag<SVGCircleElement, any>()
                        .container(g.node())
                        .subject(function (event: any) {
                            return { x: event.x, y: event.y };
                        })
                        .on("start end", function (event) {
                            let el = d3.select(this), isStarting = event.type === "start";
                            el.classed("resizing", isStarting).attr("r",
                                isStarting || el.classed("hovering") ?
                                    that.LARGE_RADIUS : that.SMALL_RADIUS)
                        }).
                        on("drag", function (event) {
                            if (d3.select(this).classed("topleft")) {
                                props.width = Math.max((props.x - event.x) + props.width, that.MIN_RECT_WIDTH);
                                props.height = Math.max((props.y - event.y) + props.height, that.MIN_RECT_HEIGHT);
                                props.x = event.x
                                props.y = event.y
                                console.log({
                                    ...props,
                                    ...event.x,
                                    ...event.y
                                })

                            } else {

                                props.width = Math.max(event.x - props.x, that.MIN_RECT_WIDTH);
                                props.height = Math.max(event.y - props.y, that.MIN_RECT_HEIGHT);

                            }

                            that.shape(props);
                        }));

                circleG.append("circle")
                    .attr("r", that.SMALL_RADIUS)
                    .classed("bottomright", true)
                    .attr("fill", "lightblue")
                    .on("mouseenter mouseleave", function (event: Event) {
                        let el = d3.select(this), isEntering = event.type === "mouseenter";
                        el.attr("cursor", "crosshair");
                        el.classed("hovering", isEntering).attr("r",
                            isEntering || el.classed("resizing") ?
                                that.LARGE_RADIUS : that.SMALL_RADIUS)

                    })
                    .call(
                        d3.drag<SVGCircleElement, any>()
                            .container(g.node())
                            .subject(function (event: any) {
                                return { x: event.x, y: event.y };
                            })
                            .on("start end", function (event) {
                                let el = d3.select(this), isStarting = event.type === "start";
                                el.classed("resizing", isStarting).attr("r",
                                    isStarting || el.classed("hovering") ?
                                        that.LARGE_RADIUS : that.SMALL_RADIUS)
                            }).
                            on("drag", function (event) {


                                if (d3.select(this).classed("topleft")) {

                                    props.width = Math.max((props.x - event.x) + props.width, that.MIN_RECT_WIDTH);
                                    props.height = Math.max((props.y - event.y) + props.height, that.MIN_RECT_HEIGHT);
                                    props.x = event.x
                                    props.y = event.y
                                    console.log({
                                        ...props,
                                        ...event.x,
                                        ...event.y
                                    })

                                } else {

                                    props.width = Math.max(event.x - props.x, that.MIN_RECT_WIDTH);
                                    props.height = Math.max(event.y - props.y, that.MIN_RECT_HEIGHT);

                                }

                                that.shape(props);
                            })

                    );
            }
        );

        var allRects = newRects.merge(rects);
        allRects.attr("transform", (d: any) => {
            return "translate(" + d.x + "," + d.y + ")";
        })

        allRects.select("rect.bg").attr("height", (d: any) => {
            return d.height;
        }).attr("width", (d: any) => {
            return d.width;
        });
        allRects.select("circle.bottomright").attr("cx", (d: any) => {
            return d.width;
        }).attr("cy", (d: any) => {
            return d.height;
        });
        //shapeEl.call(this.dragBehaviour);
        return this.svgEl;
    }

}