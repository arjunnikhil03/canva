import { ShapeProperties } from "./constants";
import * as d3 from "d3";

export class SText {
    svgEl: any;
    shapeName: string = "text";
    drawing: HTMLElement | null;

    constructor(svgEl: any) {
        this.svgEl = svgEl;
        this.drawing = document.getElementById("drawing");
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

    getCard(props: ShapeProperties) {

        let div = document.createElement("div");
        div.className = "card editBox";
        let divHeader = document.createElement("div");
        divHeader.className = "card-header";
        divHeader.textContent = "Featured";
        let divBody = document.createElement("div");
        divBody.className = "card-body";
        let divText = document.createElement("div");
        divText.style.cssText = `width: ${props.selection.text.width}px; height: ${props.selection.text.height}px`
        divBody.appendChild(divText);
        div.appendChild(divHeader);
        div.appendChild(divBody);
        div.style.cssText = `left: ${props.selection.text.left}px; top:${props.selection.text.top}px;`;
        return div;
    }

    getDefaultProps() {
        let props: ShapeProperties;

        props = {
            //x: Math.floor(Math.random() * 101),
            //y: Math.floor(Math.random() * 101),
            x: 100,
            y: 100,
            width: 100,
            height: 100,
            color: this.getRandomColor(),
            gTranslate: {
                x: 50,
                y: 50
            },
            selection: {
            },
            uniqueid: this.generateUniqueId(),
            text: "मोरया डिज़ाइन",
            fillOpacity: 0,
            fontFamily: "Yatra One",
            fontSize: "100px"
        }
        return props;
    }

    shape(props: ShapeProperties) {
        var that = this;

        this.svgEl.append(this.shapeName)
            .attr("x", props.x)
            .attr("y", props.y)
            .attr("stroke", props.color)
            .attr("fill-opacity", props.fillOpacity)
            .style("font-family", props.fontFamily)
            .style("font-size", props.fontSize)
            .text(props.text)
            .on("mouseover", function () {
                //console.log(this);
                d3.select(this).attr("fill", that.getRandomColor());
                d3.select(this).attr("fill-opacity", 100);
            })
            .on("mouseout", function () {
                d3.select(this).attr("fill-opacity", 0);
            })
            .on("click", function (event: any) {
                var p = this.parentNode;
                var el = d3.select(this);
                var xy = this.getBBox();
                //console.log(xy);
                var p_xy = p.getBBox();
                props.selection.text.width = xy.width;
                props.selection.text.height = xy.height;
                props.selection.text.left = xy.x;
                props.selection.text.top = xy.y;
                let div = that.getCard(props);
                //div.textContent = el.;

                if (that.drawing) {
                    that.drawing.append(div)
                }
                xy.x -= p_xy.x;
                xy.y -= p_xy.y;



            })
    }

}