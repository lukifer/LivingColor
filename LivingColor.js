// LivingColor.js 1.1
// -------------------
// Author: Luke Dennis
// Website: http://lukifer.github.com/LivingColor
// License: http://opensource.org/licenses/mit-license.php


(function(){

$ = jQuery || Zepto;

window.LivingColor =
{
	"rules": [],
	"rulesList": [],
	"options": {},
	"$div": false,
	"prefix": "",

	"$style": false,
	"styles":
	{
		"#LivingColor": "position: fixed; bottom: 10px; right: 10px; width: 320px; max-height: 350px; z-index: 9999; "
			+"overflow: hidden; padding: 0; background-color: #ccc; border-radius: 5px; box-shadow: 0 0px 7px 0 black; "
			+"background-image: url('"+LivingColorImageBG()+"'); "
			+"transition: top 250ms ease-in-out, bottom 250ms ease-in-out, width 250ms ease-in-out, max-height 250ms ease-in-out;"
			+"transform: translateZ(0);",
		"#LivingColor.top": "bottom: auto; top: 10px;",
		"#LivingColor h4": "position: relative; color: #ddd; background-color: #222; user-select: none; "
			+"font-size: 12px; font-family: Helvetica; margin: 0; padding: 5px 0 3px; height: 12px;",
		"#LivingColor h4 a": "display: block; position: absolute; cursor: pointer; opacity: 0.4;",
		"#LivingColor h4 a:hover": "cursor: pointer; opacity: 0.8;",
		"#LivingColor h4 a::after": "content: ''; position: absolute; display: block;",
		"#LivingColor h4 .target": "top: 3px; height: 14px; left: 5px; width: 14px; color: #ddd; overflow: hidden;",
	//	"#LivingColor h4 .target": "top: 2px; height: 15px; left: 4px; width: 15px; color: #ddd; overflow: hidden;",
		"#LivingColor h4 .target span": "font-size: 32px; position: relative; top: -19px; left: -2px;",
	//	"#LivingColor h4 .target span": "font-size: 32px; position: relative; top: -1px; left: -2px;",
	//	"#LivingColor h4 .target span": "display: inline-block; width: 15px; height: 15px;"
	//		+"background-image: url('"+LivingColorTargetIcon()+"'); background-repeat: no-repeat;"
	//		+"filter: brightness(200%);",
		".living-color-targeting #LivingColor h4 .target": "color: orange; opacity: 1.0;",
		"#LivingColor h4 .move": "top: 0; height: 20px; right: 25px; width: 22px;",
		"#LivingColor h4 .move::after": "bottom: 4px; left: 5px; height: 0; width: 0; border-style: solid; border-width: 0 5px 10px 5px; border-color: transparent transparent #ddd transparent;",
		"#LivingColor.top h4 .move::after": "border-width: 10px 5px 0 5px; border-color: #ddd transparent transparent transparent;",
		"#LivingColor h4 .minimize": "right: 3px; top: 0; width: 22px; height: 20px;",
		"#LivingColor h4 .minimize::after": "right: 5px; bottom: 4px; height: 3px; width: 12px; background: #ddd; border-radius: 1px;",
		"#LivingColor .wrap": "padding: 8px 7px; margin: 0; transition: width 250ms linear;",
		"#LivingColor.minimized": "width: 27px; max-height: 20px; ",
		"#LivingColor h4 *": "transition: opacity 120ms linear;",
		"#LivingColor.minimized .wrap": "overflow: hidden;",
		"#LivingColor.minimized .minimizehide": "opacity: 0;",
		"#LivingColor ul": "margin: 0; padding: 0; max-height: 290px; overflow-x: hidden; overflow-y: auto;",
		"#LivingColor li": "list-style: none; white-space: nowrap; height: 29px; min-height: 29px;",
		"#LivingColor li input": "font-size: 12px; padding: 5px; margin: 2px 3px; border: 0; border-radius: 3px; box-shadow: 0 0 5px 0px black inset;",
		"#LivingColor li .selector": "width: 124px;",
		"#LivingColor .overflown .selector": "width: 104px;",
		"#LivingColor li .color": "width: 48px; text-align: center; ",
		"#LivingColor .controls": "margin-top: 5px; white-space: nowrap;",
		"#LivingColor .controls select": "margin: 0 3px;",
		"#LivingColor .controls input": "margin: 1px 2px 0;"
			+"padding: 0 8px; background-color: rgb(192,192,192); color: rgb(0,0,0);"
			+"border-radius: 0; font-size: 11px; font-family: auto; box-shadow: none;",
		"#LivingColorAdd": "float: right;",

		"#LivingColor li a.icon": "cursor: pointer; display: inline-block; width: 16px; height: 16px; position: relative; top: 3px; background-size: 16px 16px; background-position: center; background-repeat: no-repeat; opacity: 0.6; ",
		"#LivingColor li a.remove": "background-image: url('"+LivingColorRemoveIcon()+"'); filter: grayscale(100%); margin-left: 4px;",
		"#LivingColor li a.filters": "background-image: url('"+LivingColorFiltersIcon()+"'); filter: brightness(10%) grayscale(100%); ",
		"#LivingColor.nofilters li a.filters": "display: none;",
		"#LivingColor.nofilters li .selector": "width: 140px;",

		"#LivingColor li a:hover": "opacity: 1.0;",
		"#LivingColor li a.active": "opacity: 0.8; filter: hue-rotate(180deg) grayscale(30%);",
		"#LivingColor li a.active:hover": "opacity: 1.0; filter: hue-rotate(180deg) grayscale(30%);",

		"#LivingColorFilters": "z-index: 10000; position: fixed; right: 5px; display:none;"
			+"background: threedface; border-color: threedhighlight threedshadow threedshadow threedhighlight;"
			+"border-width: 1px; border-style: solid; padding: 10px;",
		"#LivingColorFilters ul": "list-style: none; margin: 0; padding: 0;",
		"#LivingColorFilters label": "font-size: 12px; color: black;",
		"#LivingColorFilters label span:first-child": "display: inline-block; text-align: right; margin-right: 2px; width: 65px; white-space: nowrap;",
		"#LivingColorFilters input": "margin: 0;",
		"#LivingColorFilters input[type='range']": "position: relative; top: 4px;",
		"#LivingColorFilters input[type='number']": "width: 35px; appearance: none; border: 0px solid black; background: transparent; text-align: right;",
		"#LivingColorFilters .suffix": "display: inline-block; backgrounddd: blue; width: 1px; min-height: 11px;",
		"#LivingColorFilters .suffix::before": "content: '%'; position: relative; left: -13px; font-size: 11px;",
		"#LivingColorFilters .blur .suffix::before": "content: 'px';",
		"#LivingColorFilters .hue-rotate .suffix::before": "content: '\\00B0';",
		"#LivingColorFilters input[type='number']:hover + .suffix": "display: none",
		"#LivingColorFilters input[type='number']:focus + .suffix": "display: none;",
		"#LivingColorFilters textarea": "width: 100%; overflow: hidden; margin-top: 10px; font-size: 10px; "
			+"appearance: none; border: 0; background: transparent; resize: none;",
		"#LivingColorFilters .reset": "text-align: center;",
		
		"#jscolor": "position: fixed !important;",
		
		".living-color-target": "opacity: 0.5; cursor: default; cursor: crosshair;",
	},
	
	"attachEvents": function()
	{
		$(document)
			.on("click", "#LivingColorAdd", LivingColor.addRule)
			.on("change", "#LivingColor input[type=text]", LivingColor.inputChange)
			.on("keydown", "#LivingColor input", LivingColor.inputKeyDown)
			.on("click", "#LivingColor .minimize", LivingColor.minimize)
			.on("click", "#LivingColor .move", LivingColor.togglePosition)
			.on("click", "#LivingColor .target", LivingColor.toggleTargetMode)
			.on("change", "#LivingColorList", LivingColor.colorListChange)
			.on("click", "#LivingColorListSave", LivingColor.saveNewColorList)
			.on("click", ".living-color-target", LivingColor.targetClick)
			.on("click", "#LivingColor .remove", LivingColor.removeRow)
			.on("click", "#LivingColor .filters", LivingColor.clickFilters)
			.on("click", "#LivingColorFiltersReset", LivingColor.filtersReset)
			.on("change mousemove", "#LivingColorFilters input[type='range']", LivingColor.sliderChange)
			.on("change", "#LivingColorFilters input[type='number']", LivingColor.sliderValueChange)
			.on("change", "#LivingColor li a.filters", LivingColor.filtersChange)
			;
			
		// Drag functionality: currently disabled
		//	.on("drag", "#LivingColor", LivingColor.drag)
		//	.on("dragend", "#LivingColor", function(e){e.stopPropagation();})
	},

	// Nothing happens until this function is called
	"start": function(opts)
	{
		LivingColor.options = $.extend({
			"minimized": false,
			"defaultScheme": false
		}, opts);
		
		// Figure out which prefix we'll need
		var htmlStyle = $("html")[0].style;
		if(htmlStyle['webkitFilter'] !== undefined)
			LivingColor.prefix = "webkit";
		else if(htmlStyle['mozFilter'] !== undefined)
			LivingColor.prefix = "moz";
		else if(htmlStyle['msFilter'] !== undefined)
			LivingColor.prefix = "ms";
		
		// Inject a style tag
		if(!this['$style'])
		{
			var $style = $('<style type="text/css"></style>');
			var css = "";
			$.each(this.styles, function(sel, val)
			{
				var vals = val.split(";");
				$.each(vals, function(n, v)
				{
					var cssKeyVal = v.split(":");
					if(cssKeyVal.length != 2) return true;
					
					var cssKey = $.trim(cssKeyVal[0]);
					var cssVal = $.trim(cssKeyVal[1]);
					
					if($.inArray(cssKey, ["filter", "transform", "transition", "user-select", "appearance"]) != -1)
					{
						val +=     "-ms-"+cssKey+": "+cssVal+";";
						val +=    "-moz-"+cssKey+": "+cssVal+";";
						val += "-webkit-"+cssKey+": "+cssVal+";";
					}
				});
				css += sel+" { "+val+" } ";
			});
			$style[0].appendChild(document.createTextNode(css));
			this['$style'] = $style;
			$("head")[0].appendChild($style[0]);
		}
		
		// Announce our presence
		$("html").addClass("living-color-active");

		// Create a hidden popup for image filters
		LivingColor.createFiltersPopup();

		// Get or create the list of color rules
		LivingColor.loadRulesList();
		
		// Load active rules and display
		LivingColor.loadRules(LivingColor.rulesList.active);
		LivingColor.render();

		// Attach events
		LivingColor.attachEvents();

		// Trigger the starting rules
		$("#LivingColor input[type=text]").change();
		$("#LivingColor a.filters").change();

		// Cache our primary interface div
		var $div = $("#LivingColor");
		this["$div"] = $div;

		// Older Firefox = No CSS filters
		if(navigator.userAgent.match(/Firefox\/3[0-4]/))
			$div.addClass("nofilters");
	},

	// Fetch list of color schemes from local storage
	"loadRulesList": function(name)
	{
		var theRulesList = JSON.parse(localStorage.getItem("LC_colorRules") || "false");
		if(!theRulesList || !theRulesList.names)
		{
			theRulesList = {"names": ["Default Scheme"], "active": "Default Scheme"};
			localStorage.setItem("LC_colorRules", JSON.stringify(theRulesList));

			if(typeof LivingColor.options.defaultScheme === "object" && LivingColor.options.defaultScheme.length)
			{
				LivingColor.rules = LivingColor.options.defaultScheme;
				localStorage.setItem("LC_colorRulesDefault Scheme", JSON.stringify(LivingColor.rules));
			}
		}
		
		LivingColor.rulesList = theRulesList;
	},
	
	// Fetch the details of a color scheme from local storage
	"loadRules": function(name)
	{
		var theRules = localStorage.getItem("LC_colorRules"+name);
		
		if(theRules)
			theRules = JSON.parse(theRules) || [{"selector": "", "color": "", "backgroundColor": ""}]
		else
		{
			theRules = [{"selector": "", "color": "", "backgroundColor": ""}];
			localStorage.setItem("LC_colorRules"+name, JSON.stringify(theRules));
		}
	
		LivingColor.rules = theRules;
	},
	
	// Clear all customized style rules
	"resetAll": function()
	{
		if(LivingColor.rules.length > 0) $.each(LivingColor.rules, function(n, rule)
		{
			var prefixedFilterRule = LivingColor.prefixedFilterRule();

			$(rule.selector)
				.css("color", "")
				.css("backgroundColor", "")
				.each(function(n, el)
				{
					el.style[prefixedFilterRule] = "";
				})
				;
		});
	},
	
	// Apply all customized style rules from current color scheme
	"applyAll": function()
	{
		if(LivingColor.rules.length > 0) $.each(LivingColor.rules, function(n, rule)
		{
			var prefixedFilterRule = LivingColor.prefixedFilterRule();
			
			$(rule.selector).each(function(n, el)
			{
				var $el = $(el);
				if($el.is(".LivingColorImmune") == false && $el.parents(".LivingColorImmune").length === 0)
				{
					$el
						.css("color", rule.color ? "#"+rule.color : "")
						.css("backgroundColor", "#"+rule.backgroundColor)
						;
					
					if(rule.filters && rule.filters.length)
						$el[0].style[prefixedFilterRule] = rule.filters.join(" ");
				}
			});
		});
	},

	// Update only the element(s) that were just changed
	"liveColorChange": function(el)
	{
		var $el = $(el);
		var $li = $el.parent();
		
		// If the selector was changed, manually trigger update events for all components of this rule
		if($el.is(".selector"))
		{
			LivingColor.liveColorChange($li.children("[name='color']")[0]);
			LivingColor.liveColorChange($li.children("[name='backgroundColor']")[0]);
			LivingColor.liveColorChange($li.children("a.filters")[0]);
			return;
		}

		// Fetch DOM elements and values
		var $sel = $li.children(".selector");
		var $col = $li.children(".textColor");
		var $bgc = $li.children(".backgroundColor");
		
		var selector	= $sel.val();
		var color		= $col.val();
		var bgColor		= $bgc.val();

		selector = $.trim(selector);
		if(selector == "") return;

		// Apply CSS image filter
		if($el.is("a.filters"))
		{
			var prefixedFilterRule = LivingColor.prefixedFilterRule();
			var filterString = $el.data("filters");
			if(!filterString) filterString = "";

			$(selector).each(function(n, el)
			{
				var $el = $(el);
				if($el.is(".LivingColorImmune") == false && $el.parents(".LivingColorImmune").length === 0)
					el.style[prefixedFilterRule] = filterString;
			});
		}
		else
		{
			// Apply text color
			if(el != $bgc[0])
			{
				$(selector).each(function(n, el)
				{
					var $el = $(el);
					if($el.is(".LivingColorImmune") == false && $el.parents(".LivingColorImmune").length === 0)
						$el.css("color", color ? "#"+color : "");
				});
			}
			
			// Apply background color
			if(el != $col[0])
			{
				$(selector).each(function(n, el)
				{
					var $el = $(el);
					if($el.is(".LivingColorImmune") == false && $el.parents(".LivingColorImmune").length === 0)
						$el.css("backgroundColor", bgColor ? "#"+bgColor : "");
				});
			}
		}
	},
	
	// Add a blank rule
	"addRule": function()
	{
		var newRule = {
			"selector": "",
			"color": "", 
			"backgroundColor": "",
			"filters": []
		};
	
		LivingColor.rules.push(newRule);
		
		$("#LivingColor ul")
			.toggleClass("overflown", LivingColor.rules.length > 10)
			.append(LivingColor.renderOne(newRule));
		
		jscolor.bind();
	},
	
	// Fired when the selector or color text boxes are altered
	"inputChange": function(e)
	{			
		var $input = $(this);
		var $li = $input.parent("li");
		var index;

		$("#LivingColor li").each(function(n, li)
		{
			if(li == $li[0]) { index = n; return false; }
		});
		if(index === undefined) return;
		
		LivingColor.rules[index][$input.attr("name")] = $input.val();
		
		if($input.is(".selector"))
		{
			// If the selector is changed, we need to remove the styles on the last selector
			var last = $input.data("last-selector");
			if(last && last != $input.val())
			{
				var prefixedFilterRule = LivingColor.prefixedFilterRule();

				$(last).each(function(n, el)
				{
					var $el = $(el);
					if($el.is(".LivingColorImmune") == false && $el.parents(".LivingColorImmune").length === 0)
					{
						$el
							.css("color", "")
							.css("backgroundColor", "")
							;
						
						if(rule.filters && rule.filters.length)
							$el[0].style[prefixedFilterRule] = "";
					}
				});
			}
			
			// Cache the selector for use next time
			$input.data("last-selector", $input.val());
			
			// Apply the new color rules
			LivingColor.liveColorChange($input[0]);
		}

		localStorage.setItem("LC_colorRules"+LivingColor.rulesList.active, JSON.stringify(LivingColor.rules));
	},

	// Listen for Escape key
	"inputKeyDown": function(e)
	{
		if(e.keyCode == 27)
			$(this).blur();
	},

	// Minimized state toggle
	"minimize": function(e)
	{
		var $div = $("#LivingColor");
		if($div.hasClass("minimized"))
		{
			$div.removeClass("minimized");
			$div.find("h4 a.minimize").attr("title", "Minimize");
		}
		else
		{
			$div.addClass("minimized");
			$div.find("h4 a.minimize").attr("title", "Un-minimize");
		}
	},

	// Move to and from top/bottom position
	"togglePosition": function(e)
	{
		$LivingColor = $("#LivingColor");
		var transitionEnd = LivingColor.prefix && LivingColor.prefix != "moz"
			? LivingColor.prefix+"TransitionEnd" : "transitionend";
		
		if($LivingColor.hasClass("top"))
		{
			$LivingColor.one(transitionEnd, function()
			{
				$LivingColor.removeClass("top");
				$LivingColor.find("h4 a.move").attr("title", "Move to the top");
				$LivingColor.css("top", "");
			});
			$LivingColor.css("top", (window.innerHeight - $LivingColor.height() - 10)+"px");

			LivingColor.rulesList.top = 0;
		}
		else // if .hasClass("top") == false
		{
			$LivingColor.one(transitionEnd, function()
			{
				$LivingColor.addClass("top");
				$LivingColor.find("h4 a.move").attr("title", "Move to the bottom");
				$LivingColor.css("bottom", "");
			});
			$LivingColor.css("bottom", (window.innerHeight - $LivingColor.height() - 10)+"px");
			
			LivingColor.rulesList.top = 1;
		}
		
		// Remember position
		localStorage.setItem("LC_colorRules", JSON.stringify(LivingColor.rulesList));
	},
	
	// Trigger DOM node targeting (crosshairs)
	"toggleTargetMode": function(e)
	{
		if($("body").hasClass("living-color-targeting"))
		{
			$("body").removeClass("living-color-targeting");
			$(".living-color-target").removeClass("living-color-target");

			$(document).off("mouseover.living-color");
		}
		else
		{
			$("body").addClass("living-color-targeting");

			// Highlight targeted node
			$(document).on("mouseover.living-color", "*", function(e)
			{
				var $target = $(e.target);
				if($target.parents("#LivingColor").length > 0) return;

				$(".living-color-target").removeClass("living-color-target");
				$target.addClass("living-color-target");
			});
		}
	},

	// When targeted node is clicked, create a new rule
	"targetClick": function(e)
	{
		e.preventDefault();
		e.stopPropagation();

		var sel = "";
		var $target = $(e.target);

		// If we have an id, we just use that
		if($target.attr("id"))
		{
			sel = "#"+$target.attr("id");
		}
		
		// Otherwise, tag and class, wrapped in the closest id we can find: "#myid p.myclass", or "#myid p"
		else
		{
			var classes =
				$.trim
				(
					// Ignore our own custom classes
					$target[0].className
						.replace("living-color-targeting", "")
						.replace("living-color-target", "")
						.replace("living-color", "")
				)
				.split(/\s+/)
				;

			sel += $target[0].tagName.toLowerCase();
			if(classes.length > 0 && classes[0] != "") sel += "."+classes.join(".");
			
			// Try to find the closest parent id, if possible
			var id = false;
			var $item = $target;
			while($item = $item.parent())
			{
				if($item.length < 1) break;
				if($item.attr("id"))
				{
					id = $item.attr("id");
					break;
				}
				
				if($item[0].className && $item[0].className != "")
				{
					var classes = $.trim($item[0].className.replace("living-color", "")).split(/\s+/);
					if(classes.length > 0 && classes[0] != "")
						sel = "."+classes.join(".")+" "+sel;
				}
			}
			if(id) sel = "#"+id+" "+sel;
		}
		
		// Toggle target mode off
		$("#LivingColor h4 .target").click();
		
		// Add a new rule and populate with our new selector
		$("#LivingColorAdd").click();
		$("#LivingColor ul li:last-child input:eq(0)").val(sel);
		
		return false;
	},

	// Remove a row
	"removeRow": function(e)
	{
		// Fetch row to delete and remove
		var $li = $(e.target).parent("li");
		var index = $li.prevAll("li").length;

		// Confirm, maybe
		if($li.children(".selector").val() && !confirm('Delete this item?'))
			return;
		
		LivingColor.rules.splice(index, 1);
		
		// Display and save
		LivingColor.render();
		localStorage.setItem("LC_colorRules"+LivingColor.rulesList.active, JSON.stringify(LivingColor.rules));
	},
	
	// Revert filters to defaults
	"filtersReset": function()
	{
		var filters = LivingColor.getFilterDefaults();
		
		$.each(filters, function(key, obj)
		{
			var shortname = key.replace(" ", "-").toLowerCase();
			$("#LivingColorFilters li."+shortname+" input").val(obj['default']);
		});
		
		$("#LivingColorFilters input:first").change();
	},
	
	// Get the browser prefix for CSS filters (JS version, not CSS version: eg, webkitFilters)
	"prefixedFilterRule": function()
	{
		if(LivingColor.prefix)
			return LivingColor.prefix+'Filter';
		else
			return "filter";
	},
	
	// Toggle and move Filters modal
	"clickFilters": function()
	{
		var $a = $(this);
		var $li = $a.parent("li");
		var $filters = $("#LivingColorFilters");
		var top = $a.offset().top;

		$filters.data("link", this);
	
		// Top mode: appear just below text box
		if($("#LivingColor").is(".top"))
		{
			top += $a.height() + 3;
			
			if($filters.is(":hidden") || parseInt($filters.css("top")) != top)
			{
				$filters
					.css("bottom", "auto")
					.css("top", top+"px")
					.show()
					;

				$(document).on("click.filtersCloseClick", LivingColor.filtersCloseClick);
			}
			else LivingColor.filtersClose();
		}
		
		// Bottom mode: appear just above text box
		else
		{
			if($filters.is(":hidden") || parseInt($filters.css("top")) != top)
			{
				$filters
					.css("top", "auto")
					.css("bottom", (window.innerHeight - top - 3)+"px")
					.show()
					;

				$(document).on("click.filtersCloseClick", LivingColor.filtersCloseClick);
			}
			else LivingColor.filtersClose();
		}
		
		// Defaults
		var filterVals = {
			"brightness": "100",
			"contrast": "100",
			"saturate": "100",
			"opacity": "100",
			"hue-rotate": "0",
			"invert": "0",
			"grayscale": "0",
			"sepia": "0",
			"blur": "0",
		};
		
		// Populate user-visible text box with CSS value for current filters, for copy/pasta convenience
		var index = $li.prevAll("li").length;
		if(LivingColor.rules[index] !== undefined && LivingColor.rules[index]["filters"] !== undefined)
		{
			var savedFilters = LivingColor.rules[index]["filters"];
		
			$.each(savedFilters, function(n, str)
			{
				var split = str.split("(");
				if(split.length > 1)
					filterVals[split[0].replace(" ", "-").toLowerCase()] = parseInt(split[1]);
			});

			if(savedFilters.length > 0)
				$("#LivingColorFiltersTextarea").val((LivingColor.prefix?"-"+LivingColor.prefix+"-":"")
					+"filter: "+savedFilters.join(" "));
			else
				$("#LivingColorFiltersTextarea").val("");
		}
		
		// Populate controls with current rule values
		$.each(filterVals, function(key, val)
		{
			$("#LivingColorFilters li."+key+" input").val(val);
		})
	},
	
	// Filter Change Event: <input type="range" />
	"sliderChange": function(e)
	{
		if(e.type === "mousemove" && e.which !== 1)
			return;
	
		var $this = $(this);
		var $value = $this.parent().children('input[type="number"]');
		$value.val($this.val());

		LivingColor.updateFilters(e.type == "change");
	},

	// Filter Change Event: <input type="number" />
	"sliderValueChange": function(e)
	{
		var $range = $(this).parent().children('input[type="range"]');
		var min = parseInt($range.attr("min"));
		var max = parseInt($range.attr("max"));
		var val = $(this).val();
		
		if(/[\-0-9]/.test(val) && parseInt(val) >= min && parseInt(val) <= max)
			$range.val(val);
		else
			$(this).val($range.val());
		
		LivingColor.updateFilters(e.type == "change");
	},

	// Filter Change Event: Manual trigger on the link itself
	"filtersChange": function(e)
	{
		LivingColor.liveColorChange(e.target);
	},
	
	// Update CSS filter string and apply
	"updateFilters": function(andSave)
	{
		var $filters = $("#LivingColorFilters");
		var $a = $($filters.data("link"));
		var $li = $a.parent("li");
		var sel = $li.children(".selector");
		
		// Build array of CSS components
		var filterVals = [];
		$filters.find("li").each(function(n, li)
		{
			var $li = $(li);
			var key = li.className;
			if(key == "reset" || key == "textarea") return true;
			
			var val = $li.children("label").children("input[type='number']").val();
			if(val == $li.data("default")) return true;
			
			// Most values are percentages; provide correct units for the exceptions
			var str = key+"("+val+")";
			if(key === "blur")
				str = str.replace(")", "px)");
			else if(key === "hue-rotate")
				str = str.replace(")", "deg)");
			else
				str = str.replace(")", "%)");
			
			filterVals.push(str);
		});

		// Create string and cache to link
		var filterString = filterVals.join(" ");
		$a	.data("filters", filterString)
			.data("alt", filterString)
			.toggleClass("active", filterString !== "")
			;
		
		$("#LivingColorFiltersTextarea").val((LivingColor.prefix?"-"+LivingColor.prefix+"-":"")+"filter: "+filterString);

		// Trigger UI update
		LivingColor.liveColorChange($a[0]);

		// Only save if requested
		if(andSave)
		{
			// Find index of li
			var index = $li.prevAll("li").length;
			
			// Do the save
			LivingColor.rules[index]["filters"] = filterVals;
			localStorage.setItem("LC_colorRules"+LivingColor.rulesList.active, JSON.stringify(LivingColor.rules));
		}
	},
	
	// Click off of filters popup to close
	"filtersCloseClick": function(e)
	{
		if($(e.target).parents("#LivingColorFilters").length < 1)
		{
			LivingColor.filtersClose();
		}
	},

	// Do the closing thang
	"filtersClose": function(e)
	{
		$("#LivingColorFilters").hide();
		$(document).off("click.filtersCloseClick");
	},

	// Not yet enabled
	"drag": function(e)
	{
		if(e.originalEvent.pageY < (window.innerHeight/2))
			$('#LivingColor').addClass("top");
		else
			$('#LivingColor').removeClass("top");
	},
	
	// Switch to a new set of rules
	"colorListChange": function(e)
	{
		// Route to special "meta" actions if needed (New/Rename/Delete)
		var optClass = $("#LivingColorList :selected").attr("class");
		switch(optClass)
		{
			case "new":
				return LivingColor.saveNewColorList(true);
			case "copy":
				return LivingColor.saveNewColorList(false);
			case "rename":
				return LivingColor.renameColorList();
			case "delete":
				return LivingColor.deleteColorList();
		}
	
		var newActive = $("#LivingColorList").val();
		if(!newActive) return;

		// Clear out old rules and refresh
		LivingColor.resetAll();
		LivingColor.rulesList.active = newActive;
		LivingColor.loadRules(newActive);
		LivingColor.render();
		LivingColor.applyAll();

		// Save the new active default
		localStorage.setItem("LC_colorRules", JSON.stringify(LivingColor.rulesList));
	},
	
	// Clone current rules under a new name
	"saveNewColorList": function(reset)
	{
		var newName = prompt("Save this color scheme as:");
		if(!newName) return;
		if($.inArray(newName, LivingColor.rulesList.names) != -1)
			return alert("That name is already in use");
		
		LivingColor.rulesList.names.push(newName);
		LivingColor.rulesList.active = newName;
		
		localStorage.setItem("LC_colorRules", JSON.stringify(LivingColor.rulesList));
		localStorage.setItem("LC_colorRules"+newName, reset ? "[]" : JSON.stringify(LivingColor.rules));

		LivingColor.render();
	},

	// Change the name of current color scheme
	"renameColorList": function()
	{
		var newName = prompt('Choose a new name for "'+LivingColor.rulesList.active+'"');
		if(!newName) return;
		
		var index = $.inArray(LivingColor.rulesList.active, LivingColor.rulesList.names);
		if(index == -1) return;
		
		var oldName = LivingColor.rulesList.active;
		LivingColor.rulesList.names[index] = newName;
		LivingColor.rulesList.active = newName;

		localStorage.setItem("LC_colorRules", JSON.stringify(LivingColor.rulesList));
		localStorage.setItem("LC_colorRules"+newName, JSON.stringify(LivingColor.rules));
		localStorage.removeItem("LC_colorRules"+oldName);

		LivingColor.render();
	},

	// Delete color scheme, after confirming
	"deleteColorList": function()
	{
		if(!confirm('Delete "'+LivingColor.rulesList.active+'"?'))
			return;

		var index = $.inArray(LivingColor.rulesList.active, LivingColor.rulesList.names);
		if(index == -1) return;
		
		// Delete
		LivingColor.rulesList.names.splice(index, 1);

		localStorage.removeItem("LC_colorRules"+LivingColor.rulesList.active);
		
		// Change to previous scheme, creating a blank default if necessary
		if(LivingColor.rulesList.names.length == 0)
			LivingColor.rulesList.names = ["Default Scheme"];
		if(index !== 0)
			index--;
		
		// Save and re-render
		LivingColor.rulesList.active = LivingColor.rulesList.names[index];
		localStorage.setItem("LC_colorRules", JSON.stringify(LivingColor.rulesList));
		
		LivingColor.render();
	},
	
	// Convenience function for list of filters
	"getFilterDefaults": function()
	{
		return {
			"Brightness": {"max": 200, "default": "100"},
			"Contrast": {"max": 200, "default": "100"},
			"Saturate": {"max": 200, "default": "100"},
			"Invert": {"max": 100, "default": "0"},
			"Hue Rotate": {"max": 360, "default": "0"},
			"Opacity": {"max": 100, "default": "100"},
			"Blur": {"max": 50, "default": "0"},
			"Sepia": {"max": 100, "default": "0"},
			"Grayscale": {"max": 100, "default": "0"},
		};
	},
	
	// Spawn ye olde popupe for filterse
	"createFiltersPopup": function()
	{
		var filters = LivingColor.getFilterDefaults();
		
		var html = '<div id="LivingColorFilters" class="LivingColorImmune"><ul>'
		$.each(filters, function(name, obj)
		{
			var shortname = name.replace(' ', '-').toLowerCase();
			html += '<li class="'+shortname+'" data-default="'+obj['default']+'"><label><span>'+name+'</span> '
				+'<input type="range" min="0" max="'+obj.max+'" /> '
				+'<input type="number" name="'+shortname+'" pattern="[\\-0-9]{1,3}" /><span class="suffix"></span>'
				+'</label></li>';
		});
		html += '<li class="textarea"><textarea id="LivingColorFiltersTextarea" rows="2" readonly="readonly"></textarea></li>';
		html += '<li class="reset"><button id="LivingColorFiltersReset">Reset</button></li>';
		html += '</ul></div>';
	
		var $div = $(html).hide();
		$("body").append($div);
	},
	
	// Render the primary interface, creating from scratch if necessary
	"render": function()
	{
		var $div = $("#LivingColor");
		 
		if($div.length < 1)
		{
			$("body").append('<div id="LivingColor" class="LivingColorImmune"></div>');
			$div = $("#LivingColor");
			
			if(LivingColor.options.minimized)
				$div.addClass("minimized");
		}

		if(typeof LivingColor.rulesList !== "object")
			LivingColor.rulesList = {};
		if(LivingColor.rulesList.top !== false)
			$div.addClass("top");
		
		// Render add button
		var html = '<h4><a class="target minimizehide" title="Target an element to style"><span>&#8982;</span></a>'
		//var html = '<h4><a class="target minimizehide"><span></span></a>'
			+'<span class="minimizehide">Living Color</span>'
			+'<a class="move minimizehide" title="Move to the '
				+(LivingColor.rulesList.top?"bottom":"top")+'"></a>'
			+'<a class="minimize" title="Minimize"></a></h4>'
			+'<div class="wrap"><ul></ul>'
			+'<div class="controls"><input type="button" id="LivingColorAdd" value="Add Rule" />';

		// Render select menu for color schemes
		var activeName = LivingColor.rulesList.active;
		html += '<select id="LivingColorList">';
		$.each(LivingColor.rulesList.names, function(n, name)
		{
			html += '<option value="'+name+'"'+(activeName == name ? ' selected="selected"' : '')+'>'+name+'</option>';
		});
		html += '<option disabled="disabled"></option>';
		html += '<option class="new">New Scheme...</option>';
		html += '<option class="copy">Copy "'+activeName+'"...</option>';
		html += '<option class="rename">Rename "'+activeName+'"...</option>';
		html += '<option class="delete">Delete "'+activeName+'"...</option>';
		html += '</select>';

		html += '</div></div>';
		$div.html(html);

		// Render rules
		html = '';
		if(LivingColor.rules.length < 1)
			LivingColor.rules.push({ "selector": "", "color": "", "backgroundColor": "", "filters": [] });
		if(LivingColor.rules.length > 0) $.each(LivingColor.rules, function(n, rule){
			html += LivingColor.renderOne(rule);
		});

		$div
			.children(".wrap")
			.children("ul")
			.toggleClass("overflown", LivingColor.rules.length > 10)
			.html(html)
			;

		// Attach color picker
		jscolor.bind();
		$("#jscolor").addClass("LivingColorImmune");
	},
	
	// Render each row of primary interface
	"renderOne": function(rule)
	{
		if(!rule.filters) rule.filters = [];
	
		return '<li>'
		+	'<input type="text" name="selector" class="selector" value="'+rule.selector+'" placeholder="Selector (#id .class)" />'
		+	'<input type="text" name="color" class="textColor color {required:false,onImmediateChange:\'LivingColor.liveColorChange(this.valueElement)\'}" value="'+rule.color+'" placeholder="Text" />'
		+	'<input type="text" name="backgroundColor" class="backgroundColor color {required:false,onImmediateChange:\'LivingColor.liveColorChange(this.valueElement)\'}" value="'+rule.backgroundColor+'" placeholder="BG" />'
		+	'<a class="filters icon'+(rule.filters.length ? " active" : "")+'" data-filters="'+rule.filters.join(" ")+'" title="Image filters: '+(rule.filters.length ? rule.filters.join(" ") : "None")+'"></a>'
		+	'<a class="remove icon" title="Remove"></a>'
		+	'</li>';
	}
};

})();

// Inline data URI images
// (Evil hack: If these are functions, I can call them before they're declared. EVIL!)

function LivingColorRemoveIcon()
{
	return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAXVBMVEUAAAA/IlQ/IVM/IlRAIlQ/IlQ/IlQ+IlQ/IlQ/IlM/IlM/IlQ/IlQ/IlQ/IlQ/IlQ/IlQ/IlQ/IlQ/IVM/IlQ/IVQ/IlQ/IlQ/IlQ/IlQ/IlQ/IlM/IlQ/IlQ/IlRMHdouAAAAH3RSTlMA/k/ujkX6i+eCXFY29uu3csGgTEgg9N+uqZhj0MMqu7jceAAAAGxJREFUGNOtz8kOgCAMRVEqoziAghOo//+ZNoAJ7r15q7NoUpKzatOkdFsmgwLYmGR2QZigakYYadWJ4JoqTjAv2ZtLV1sIu5gPHMgMoteKd9Q3Xxj5zxCV19R1BaIwF5gJJ2yCZV+H1Grw2QcYmQaccSLtigAAAABJRU5ErkJggg==";
}
function LivingColorTargetIcon()
{
	return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPBAMAAADJ+Ih5AAAAJFBMVEUAAAC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLR/RU6UAAAAC3RSTlMAP7Hff08fn18vb8OOC9cAAABVSURBVAjXYwCC2QkMECAtAKGdd292ANHsm6KDtoMY3g3cDN0gISMGbgYmAwaGxK1ABuvGBIbdu3dvAuINDBO3CEoLigBFoGpguhbAzIGZvADJLrjtALcpGetQDVhaAAAAAElFTkSuQmCC";
	//return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAZlBMVEUAAAAYGBgbGxskJCQPDw8UFBQaGhoqKiogICATExMJCQknJycNDQ0qKiokJCQWFhYMDAwMDAwkJCQODg4oKCguLi4FBQUaGhoaGhoGBgYdHR0QEBArKysnJyckJCQWFhYMDAwvLy84KBAfAAAAGHRSTlMAPx+vr08v39/f35+ff39/f29fX08/P79cCSLoAAAAfUlEQVQI102PVw7DIBBEBwPuLW4Jpvr+l8wKsMSTZlZP87VI1E+FkvM5C5saY0wzvTpYftiD2yHp7DbAAZubo7ec6qbwlqpit8wub1bhl/jmi5r5hTHmKYunHegElaaIDiBWvUff9QeRMQgZpAgjMmuvlOrjmrnUhZJa5f/+QNkG43HCTRYAAAAASUVORK5CYII=";
}
function LivingColorFiltersIcon()
{
//	return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAMBJREFUeJxikJGRYcCCNYG4CIgvA/ENIC4DYi1satEFVIB4IRC/A+L/QPwPiC8A8QMg/gDEy4BYFZcBtkB8H6oRhn8AsTEQiwBxCBCfB+KnULUoBoBMfYimGWaAIZIlfEC8GoifwVwCEmQE4sVYNMMMMELzJsiQi0C8AqQXFmAfSTAAhAOB+BNIL4hTiEMzPgOEgfgRKHYYoFFFqgEgbx8C4ttUMYBiL1AciBRHI8UJiSpJmSqZiazsDAAAAP//AwDzSs49QqCirAAAAABJRU5ErkJggg==";
	return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAWlBMVEUAAADkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQHkUQFQdYNSAAAAHXRSTlMAu1j23O0ktnmt7zEFmmsU+PuolG1sOCENfDUmY8QXtcAAAADvSURBVDjLrVNZFoMgDAyUTUHsZt2a+1+zgFp4aqUf5oMHk4FsA5xulB74GgOClwJMs88qkLwkonRLsUtgiDfEsLCN83FXzRW/dm3U/bF6fm2rMGoCOakqwqe9Sv2d9VCpajAArSr9yXaxvoJdHMI0vAlrHTAwd7ywYqn2ieG+rolLT3hElwF6zgRDppjS3xMB6j1CDMymXQReU4yEmrutXvyj9HSQCQH8o3Kccwx1VcBSQhWqpv8RQMjbQYh8krFMsinzZ6OG2KhMq/eH1cdh5cedF0yUnE0lZ6PksqJNw8hj2VMLIDgXYCzNfL1z7QNo2CP3M6GClQAAAABJRU5ErkJggg==";
}
function LivingColorImageHV()
{
	return "data:image/png;base64,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";
}
function LivingColorImageHS()
{
	return "data:image/png;base64,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";
}
function LivingColorImageBG()
{
	return "data:image/jpeg;base64,/9j/4Qw8aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjEuMiI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaDwveG1wOkNyZWF0b3JUb29sPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIj4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDoyMjNCQ0QyMzZERUExMUUxQjgxMTgzQzAyOEVDQjQyQjwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+eG1wLmRpZDoyMjNCQ0QyNDZERUExMUUxQjgxMTgzQzAyOEVDQjQyQjwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkRlcml2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgPHN0UmVmOmluc3RhbmNlSUQ+eG1wLmlpZDoyMjNCQ0QyMTZERUExMUUxQjgxMTgzQzAyOEVDQjQyQjwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDoyMjNCQ0QyMjZERUExMUUxQjgxMTgzQzAyOEVDQjQyQjwvc3RSZWY6ZG9jdW1lbnRJRD4KICAgICAgICAgPC94bXBNTTpEZXJpdmVkRnJvbT4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pv/bAEMAAwICAwICAwMDAwQDAwQFCAUFBAQFCgcHBggMCgwMCwoLCw0OEhANDhEOCwsQFhARExQVFRUMDxcYFhQYEhQVFP/bAEMBAwQEBQQFCQUFCRQNCw0UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/AABEIAGQAZAMBIQACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/APpAIuMAMPotLt2jj8cqP8K1OchKbySQMD2p6KpHAz9GoAQrgjCt+PNLhcg/d/LNMY8MvQM2aQxqxxnP1U0gG+SyHCsPyxSjzR1Jx9aAF2ueT8w9TTSn94ZPtQIcEGOhP/AaKAG+aGwAST6YxRjJ+6c+ppgKJCp9B9KMnHPz0AIH7YH5U5PK/uj65oGKxXtz+NNChj94D8RSEPCjHRj7inMcKCAwPvTGMxuOQxJ9qbgL3GP96gQGfBwCn5Z/pRSGVxMpyQgP40CUk/dA/wCBUxDZHGR/U1G0yoPf60AOFwc5wQPw/wAaebgOOo/PFAxROyHAdT7Z/wDrUhuST2H40CFEzHnrSm72gEijcYz7WDzu59zSG63D7x+gpCFS5UL3P1//AFUUwM03DMORn6gU9EGNxOO+MUwHiZUyBuBphueeGA/z70WABc56spHtSeeucgg+vH/1qAE8xXPUjHbApBMCTyD9RTAPtDBvlGPxpfPOc7wB6c0gEkl3YO5R+PWnC4TA5OfUGgBpuTngN+Q/wopgQKwzhnAPsKQ43cZP1yaQDSW3Ywox/smhgqjJ+96ZIoANwxwGz7HIoVSedpA9TimA8Ryscg8fShlkXPygn2FADRvwOpFSAgHkY9cCgBCUDcKDn1oBKk4OPouaAGjzDnEn5rRSAmKMy8Y+tMKkqR8p+hoAFUgYEZHvSjcB2U/Si4Cbgp5bZn2oDOThGDfUCmA8wSEcqM0ihk/5Zrn1oANmegOfTrSFM9UGfQigAC8ensKeF2gcmgBdpPIYj/P1ooAeAqjHyt7bqTCAHEa/jzQA8YOPl/Q0u5V4IA/OkA1+ACp+U+qGkBUfxE/pTAWNkbPpjvmnkI3RefxoAjx67gPrScdzwPegBzYAB5pvAUenrmkA1o0zzj86KYCmUtna4I9KQSFzycn2yKAJSSy4JA98VHuEfqw+lIBwlWTgrjjrSlVIwOD+FACFdgAAYjv8woPI6HH1/wDrUAOjVW6cfXk09sNkZXj1FAEeVTjI/wCAmjzNv8QHvmgBrTpnlwf+BUUWAiQAdWxn1NTYbA4H1z/9amAwszZBVjURBH98H25/pQAsQfOSxX6jrTiQh++B+dIA80MMGQke1GI2T7rfiaYAAo4OV9xzTiVXgOT9aAE3N2K49zStG44yGFADCnsPzP8AjRSAVdoPJ/TpT9wZcDdTAb5TbiMnP1NLsZQc4J+tIBBCw/hAHruxUckZB+baB9TTAVC3RWB+q5p4LEfNk+4AoAUsVYAcj3NJ17L196QCsmOVHFMyy8ZOPQUwADdyeD9BRSsBa8odTGpA9jTHQHsQaAHpEmMEYx2LU7ywD8obH0z/AFoAQggY2H6mozDubqnXpimA5oipHK/QD/69N2ndnKH2C1NwHFd/GASPao/KyeePwpgSCLYOWY5/2cUqxJ1+b/vmgBTCp6qD9R/9eiiwFlIMcNjj/YpGhQt0P/fNIBrRojcAkjttoEZxkEL+dAB5TAgkq3HYn/CpRCf7pagBPIIGDjH+1TFhCkggH8aAFKOp4Cgf59qCDg/OM+2OaAGiE/WneQR1B/DmgBotWPQsP+AZooHcfI2GXgfjSjAAwAM9aAJI0DNznpT2X5upA9M0CI9w3kbRUhbBIx0GaQ0RGVsE8CkR2k6n8gKYiQxgEDrTzEGKrkgH0NIYvkqCVxwBStEq8AfpTEROoVsYz9aKQH//2Q==";
	//return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACAQMAAABIeJ9nAAAABlBMVEX///8AAABVwtN+AAAADElEQVQI12NoYHAAAAHEAMFJRSpJAAAAAElFTkSuQmCC';
}














/**
 * jscolor, JavaScript Color Picker
 *
 * @version 1.4.1
 * @license GNU Lesser General Public License, http://www.gnu.org/copyleft/lesser.html
 * @author  Jan Odvarko, http://odvarko.cz
 * @created 2008-06-15
 * @updated 2013-04-08
 * @link    http://jscolor.com
 */

var jscolor = {


	dir : '', // location of jscolor directory (leave empty to autodetect)
	bindClass : 'color', // class name
	binding : true, // automatic binding via <input class="...">
	preloading : true, // use image preloading?


	install : function() {
		jscolor.addEvent(window, 'load', jscolor.init);
	},


	init : function() {
		if(jscolor.binding) {
			jscolor.bind();
		}
		if(jscolor.preloading) {
			jscolor.preload();
		}
	},


	getDir : function() {
		if(!jscolor.dir) {
			var detected = jscolor.detectDir();
			jscolor.dir = detected!==false ? detected : 'jscolor/';
		}
		return jscolor.dir;
	},


	detectDir : function() {
		var base = location.href;

		var e = document.getElementsByTagName('base');
		for(var i=0; i<e.length; i+=1) {
			if(e[i].href) { base = e[i].href; }
		}

		var e = document.getElementsByTagName('script');
		for(var i=0; i<e.length; i+=1) {
			if(e[i].src && /(^|\/)jscolor\.js([?#].*)?$/i.test(e[i].src)) {
				var src = new jscolor.URI(e[i].src);
				var srcAbs = src.toAbsolute(base);
				srcAbs.path = srcAbs.path.replace(/[^\/]+$/, ''); // remove filename
				srcAbs.query = null;
				srcAbs.fragment = null;
				return srcAbs.toString();
			}
		}
		return false;
	},


	bind : function() {
		var matchClass = new RegExp('(^|\\s)('+jscolor.bindClass+')(\\s*(\\{[^}]*\\})|\\s|$)', 'i');
		var e = document.getElementsByTagName('input');
		for(var i=0; i<e.length; i+=1) {
			var m;
			if(!e[i].color && e[i].className && (m = e[i].className.match(matchClass))) {
				var prop = {};
				if(m[4]) {
					try {
						prop = (new Function ('return (' + m[4] + ')'))();
					} catch(eInvalidProp) {}
				}
				e[i].color = new jscolor.color(e[i], prop);
			}
		}
	},


	preload : function() {
		for(var fn in jscolor.imgRequire) {
			if(jscolor.imgRequire.hasOwnProperty(fn)) {
				jscolor.loadImage(fn);
			}
		}
	},


	images : {
		pad : [ 181, 101 ],
		sld : [ 16, 101 ],
		cross : [ 15, 15 ],
		arrow : [ 7, 11 ]
	},


	imgRequire : {},
	imgLoaded : {},


	requireImage : function(filename) {
		jscolor.imgRequire[filename] = true;
	},


	loadImage : function(filename) {
/*
		if(!jscolor.imgLoaded[filename]) {
			jscolor.imgLoaded[filename] = new Image();
			jscolor.imgLoaded[filename].src = jscolor.getDir()+filename;
		}
*/
	},


	fetchElement : function(mixed) {
		return typeof mixed === 'string' ? document.getElementById(mixed) : mixed;
	},


	addEvent : function(el, evnt, func) {
		if(el.addEventListener) {
			el.addEventListener(evnt, func, false);
		} else if(el.attachEvent) {
			el.attachEvent('on'+evnt, func);
		}
	},


	fireEvent : function(el, evnt) {
		if(!el) {
			return;
		}
		if(document.createEvent) {
			var ev = document.createEvent('HTMLEvents');
			ev.initEvent(evnt, true, true);
			el.dispatchEvent(ev);
		} else if(document.createEventObject) {
			var ev = document.createEventObject();
			el.fireEvent('on'+evnt, ev);
		} else if(el['on'+evnt]) { // alternatively use the traditional event model (IE5)
			el['on'+evnt]();
		}
	},


	getElementPos : function(e) {
		var e1=e, e2=e;
		var x=0, y=0;
		if(e1.offsetParent) {
			do {
				x += e1.offsetLeft;
				y += e1.offsetTop;
			} while(e1 = e1.offsetParent);
		}
		while((e2 = e2.parentNode) && e2.nodeName.toUpperCase() !== 'BODY') {
			x -= e2.scrollLeft;
			y -= e2.scrollTop;
		}
		return [x, y];
	},


	getElementSize : function(e) {
		return [e.offsetWidth, e.offsetHeight];
	},


	getRelMousePos : function(e) {
		var x = 0, y = 0;
		if (!e) { e = window.event; }
		if (typeof e.offsetX === 'number') {
			x = e.offsetX;
			y = e.offsetY;
		} else if (typeof e.layerX === 'number') {
			x = e.layerX;
			y = e.layerY;
		}
		return { x: x, y: y };
	},


	getViewPos : function() {
		if(typeof window.pageYOffset === 'number') {
			return [window.pageXOffset, window.pageYOffset];
		} else if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
			return [document.body.scrollLeft, document.body.scrollTop];
		} else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
			return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
		} else {
			return [0, 0];
		}
	},


	getViewSize : function() {
		if(typeof window.innerWidth === 'number') {
			return [window.innerWidth, window.innerHeight];
		} else if(document.body && (document.body.clientWidth || document.body.clientHeight)) {
			return [document.body.clientWidth, document.body.clientHeight];
		} else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
			return [document.documentElement.clientWidth, document.documentElement.clientHeight];
		} else {
			return [0, 0];
		}
	},


	URI : function(uri) { // See RFC3986

		this.scheme = null;
		this.authority = null;
		this.path = '';
		this.query = null;
		this.fragment = null;

		this.parse = function(uri) {
			var m = uri.match(/^(([A-Za-z][0-9A-Za-z+.-]*)(:))?((\/\/)([^\/?#]*))?([^?#]*)((\?)([^#]*))?((#)(.*))?/);
			this.scheme = m[3] ? m[2] : null;
			this.authority = m[5] ? m[6] : null;
			this.path = m[7];
			this.query = m[9] ? m[10] : null;
			this.fragment = m[12] ? m[13] : null;
			return this;
		};

		this.toString = function() {
			var result = '';
			if(this.scheme !== null) { result = result + this.scheme + ':'; }
			if(this.authority !== null) { result = result + '//' + this.authority; }
			if(this.path !== null) { result = result + this.path; }
			if(this.query !== null) { result = result + '?' + this.query; }
			if(this.fragment !== null) { result = result + '#' + this.fragment; }
			return result;
		};

		this.toAbsolute = function(base) {
			var base = new jscolor.URI(base);
			var r = this;
			var t = new jscolor.URI;

			if(base.scheme === null) { return false; }

			if(r.scheme !== null && r.scheme.toLowerCase() === base.scheme.toLowerCase()) {
				r.scheme = null;
			}

			if(r.scheme !== null) {
				t.scheme = r.scheme;
				t.authority = r.authority;
				t.path = removeDotSegments(r.path);
				t.query = r.query;
			} else {
				if(r.authority !== null) {
					t.authority = r.authority;
					t.path = removeDotSegments(r.path);
					t.query = r.query;
				} else {
					if(r.path === '') {
						t.path = base.path;
						if(r.query !== null) {
							t.query = r.query;
						} else {
							t.query = base.query;
						}
					} else {
						if(r.path.substr(0,1) === '/') {
							t.path = removeDotSegments(r.path);
						} else {
							if(base.authority !== null && base.path === '') {
								t.path = '/'+r.path;
							} else {
								t.path = base.path.replace(/[^\/]+$/,'')+r.path;
							}
							t.path = removeDotSegments(t.path);
						}
						t.query = r.query;
					}
					t.authority = base.authority;
				}
				t.scheme = base.scheme;
			}
			t.fragment = r.fragment;

			return t;
		};

		function removeDotSegments(path) {
			var out = '';
			while(path) {
				if(path.substr(0,3)==='../' || path.substr(0,2)==='./') {
					path = path.replace(/^\.+/,'').substr(1);
				} else if(path.substr(0,3)==='/./' || path==='/.') {
					path = '/'+path.substr(3);
				} else if(path.substr(0,4)==='/../' || path==='/..') {
					path = '/'+path.substr(4);
					out = out.replace(/\/?[^\/]*$/, '');
				} else if(path==='.' || path==='..') {
					path = '';
				} else {
					var rm = path.match(/^\/?[^\/]*/)[0];
					path = path.substr(rm.length);
					out = out + rm;
				}
			}
			return out;
		}

		if(uri) {
			this.parse(uri);
		}

	},


	//
	// Usage example:
	// var myColor = new jscolor.color(myInputElement)
	//

	color : function(target, prop) {


		this.required = true; // refuse empty values?
		this.adjust = true; // adjust value to uniform notation?
		this.hash = false; // prefix color with # symbol?
		this.caps = true; // uppercase?
		this.slider = true; // show the value/saturation slider?
		this.valueElement = target; // value holder
		this.styleElement = target; // where to reflect current color
		this.onImmediateChange = null; // onchange callback (can be either string or function)
		this.hsv = [0, 0, 1]; // read-only  0-6, 0-1, 0-1
		this.rgb = [1, 1, 1]; // read-only  0-1, 0-1, 0-1
		this.minH = 0; // read-only  0-6
		this.maxH = 6; // read-only  0-6
		this.minS = 0; // read-only  0-1
		this.maxS = 1; // read-only  0-1
		this.minV = 0; // read-only  0-1
		this.maxV = 1; // read-only  0-1

		this.pickerOnfocus = true; // display picker on focus?
		this.pickerMode = 'HSV'; // HSV | HVS
		this.pickerPosition = 'bottom'; // left | right | top | bottom
		this.pickerSmartPosition = true; // automatically adjust picker position when necessary
		this.pickerButtonHeight = 20; // px
		this.pickerClosable = false;
		this.pickerCloseText = 'Close';
		this.pickerButtonColor = 'ButtonText'; // px
		this.pickerFace = 10; // px
		this.pickerFaceColor = 'ThreeDFace'; // CSS color
		this.pickerBorder = 1; // px
		this.pickerBorderColor = 'ThreeDHighlight ThreeDShadow ThreeDShadow ThreeDHighlight'; // CSS color
		this.pickerInset = 1; // px
		this.pickerInsetColor = 'ThreeDShadow ThreeDHighlight ThreeDHighlight ThreeDShadow'; // CSS color
		this.pickerZIndex = 10000;


		for(var p in prop) {
			if(prop.hasOwnProperty(p)) {
				this[p] = prop[p];
			}
		}


		this.hidePicker = function() {
			if(isPickerOwner()) {
				removePicker();
			}
		};


		this.showPicker = function() {
			if(!isPickerOwner()) {
				var tp = jscolor.getElementPos(target); // target pos
				var ts = jscolor.getElementSize(target); // target size
				var vp = jscolor.getViewPos(); // view pos
				var vs = jscolor.getViewSize(); // view size
				var ps = getPickerDims(this); // picker size
				var a, b, c;
				switch(this.pickerPosition.toLowerCase()) {
					case 'left': a=1; b=0; c=-1; break;
					case 'right':a=1; b=0; c=1; break;
					case 'top':  a=0; b=1; c=-1; break;
					default:     a=0; b=1; c=1; break;
				}
				var l = (ts[b]+ps[b])/2;

				// picker pos
				if (!this.pickerSmartPosition) {
					var pp = [
						tp[a],
						tp[b]+ts[b]-l+l*c
					];
				} else {
					var pp = [
						-vp[a]+tp[a]+ps[a] > vs[a] ?
							(-vp[a]+tp[a]+ts[a]/2 > vs[a]/2 && tp[a]+ts[a]-ps[a] >= 0 ? tp[a]+ts[a]-ps[a] : tp[a]) :
							tp[a],
						-vp[b]+tp[b]+ts[b]+ps[b]-l+l*c > vs[b] ?
							(-vp[b]+tp[b]+ts[b]/2 > vs[b]/2 && tp[b]+ts[b]-l-l*c >= 0 ? tp[b]+ts[b]-l-l*c : tp[b]+ts[b]-l+l*c) :
							(tp[b]+ts[b]-l+l*c >= 0 ? tp[b]+ts[b]-l+l*c : tp[b]+ts[b]-l-l*c)
					];
				}
				drawPicker(pp[a], pp[b]);
			}
		};


		this.importColor = function() {
			if(!valueElement) {
				this.exportColor();
			} else {
				if(!this.adjust) {
					if(!this.fromString(valueElement.value, leaveValue)) {
						styleElement.style.backgroundImage = styleElement.jscStyle.backgroundImage;
						styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
						styleElement.style.color = styleElement.jscStyle.color;
						this.exportColor(leaveValue | leaveStyle);
					}
				} else if(!this.required && /^\s*$/.test(valueElement.value)) {
					valueElement.value = '';
					styleElement.style.backgroundImage = styleElement.jscStyle.backgroundImage;
					styleElement.style.backgroundColor = styleElement.jscStyle.backgroundColor;
					styleElement.style.color = styleElement.jscStyle.color;
					this.exportColor(leaveValue | leaveStyle);

				} else if(this.fromString(valueElement.value)) {
					// OK
				} else {
					this.exportColor();
				}
			}
		};


		this.exportColor = function(flags) {
			if(!(flags & leaveValue) && valueElement) {
				var value = this.toString();
				if(this.caps) { value = value.toUpperCase(); }
				if(this.hash) { value = '#'+value; }
				valueElement.value = value;
			}
			if(!(flags & leaveStyle) && styleElement) {
				styleElement.style.backgroundImage = "none";
				styleElement.style.backgroundColor =
					'#'+this.toString();
				styleElement.style.color =
					0.213 * this.rgb[0] +
					0.715 * this.rgb[1] +
					0.072 * this.rgb[2]
					< 0.5 ? '#FFF' : '#000';
			}
			if(!(flags & leavePad) && isPickerOwner()) {
				redrawPad();
			}
			if(!(flags & leaveSld) && isPickerOwner()) {
				redrawSld();
			}
		};


		this.fromHSV = function(h, s, v, flags) { // null = don't change
			if(h !== null) { h = Math.max(0.0, this.minH, Math.min(6.0, this.maxH, h)); }
			if(s !== null) { s = Math.max(0.0, this.minS, Math.min(1.0, this.maxS, s)); }
			if(v !== null) { v = Math.max(0.0, this.minV, Math.min(1.0, this.maxV, v)); }

			this.rgb = HSV_RGB(
				h===null ? this.hsv[0] : (this.hsv[0]=h),
				s===null ? this.hsv[1] : (this.hsv[1]=s),
				v===null ? this.hsv[2] : (this.hsv[2]=v)
			);

			this.exportColor(flags);
		};


		this.fromRGB = function(r, g, b, flags) { // null = don't change
			if(r !== null) { r = Math.max(0.0, Math.min(1.0, r)); }
			if(g !== null) { g = Math.max(0.0, Math.min(1.0, g)); }
			if(b !== null) { b = Math.max(0.0, Math.min(1.0, b)); }

			var hsv = RGB_HSV(
				r===null ? this.rgb[0] : r,
				g===null ? this.rgb[1] : g,
				b===null ? this.rgb[2] : b
			);
			if(hsv[0] !== null) {
				this.hsv[0] = Math.max(0.0, this.minH, Math.min(6.0, this.maxH, hsv[0]));
			}
			if(hsv[2] !== 0) {
				this.hsv[1] = hsv[1]===null ? null : Math.max(0.0, this.minS, Math.min(1.0, this.maxS, hsv[1]));
			}
			this.hsv[2] = hsv[2]===null ? null : Math.max(0.0, this.minV, Math.min(1.0, this.maxV, hsv[2]));

			// update RGB according to final HSV, as some values might be trimmed
			var rgb = HSV_RGB(this.hsv[0], this.hsv[1], this.hsv[2]);
			this.rgb[0] = rgb[0];
			this.rgb[1] = rgb[1];
			this.rgb[2] = rgb[2];

			this.exportColor(flags);
		};


		this.fromString = function(hex, flags) {
			var m = hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
			if(!m) {
				return false;
			} else {
				if(m[1].length === 6) { // 6-char notation
					this.fromRGB(
						parseInt(m[1].substr(0,2),16) / 255,
						parseInt(m[1].substr(2,2),16) / 255,
						parseInt(m[1].substr(4,2),16) / 255,
						flags
					);
				} else { // 3-char notation
					this.fromRGB(
						parseInt(m[1].charAt(0)+m[1].charAt(0),16) / 255,
						parseInt(m[1].charAt(1)+m[1].charAt(1),16) / 255,
						parseInt(m[1].charAt(2)+m[1].charAt(2),16) / 255,
						flags
					);
				}
				return true;
			}
		};


		this.toString = function() {
			return (
				(0x100 | Math.round(255*this.rgb[0])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[1])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[2])).toString(16).substr(1)
			);
		};


		function RGB_HSV(r, g, b) {
			var n = Math.min(Math.min(r,g),b);
			var v = Math.max(Math.max(r,g),b);
			var m = v - n;
			if(m === 0) { return [ null, 0, v ]; }
			var h = r===n ? 3+(b-g)/m : (g===n ? 5+(r-b)/m : 1+(g-r)/m);
			return [ h===6?0:h, m/v, v ];
		}


		function HSV_RGB(h, s, v) {
			if(h === null) { return [ v, v, v ]; }
			var i = Math.floor(h);
			var f = i%2 ? h-i : 1-(h-i);
			var m = v * (1 - s);
			var n = v * (1 - s*f);
			switch(i) {
				case 6:
				case 0: return [v,n,m];
				case 1: return [n,v,m];
				case 2: return [m,v,n];
				case 3: return [m,n,v];
				case 4: return [n,m,v];
				case 5: return [v,m,n];
			}
		}


		function removePicker() {
			delete jscolor.picker.owner;
			document.getElementsByTagName('body')[0].removeChild(jscolor.picker.boxB);
		}


		function drawPicker(x, y) {
			if(!jscolor.picker) {
				jscolor.picker = {
					box : document.createElement('div'),
					boxB : document.createElement('div'),
					pad : document.createElement('div'),
					padB : document.createElement('div'),
					padM : document.createElement('div'),
					sld : document.createElement('div'),
					sldB : document.createElement('div'),
					sldM : document.createElement('div'),
					btn : document.createElement('div'),
					btnS : document.createElement('span'),
					btnT : document.createTextNode(THIS.pickerCloseText)
				};
				for(var i=0,segSize=4; i<jscolor.images.sld[1]; i+=segSize) {
					var seg = document.createElement('div');
					seg.style.height = segSize+'px';
					seg.style.fontSize = '1px';
					seg.style.lineHeight = '0';
					jscolor.picker.sld.appendChild(seg);
				}
				jscolor.picker.sldB.appendChild(jscolor.picker.sld);
				jscolor.picker.box.appendChild(jscolor.picker.sldB);
				jscolor.picker.box.appendChild(jscolor.picker.sldM);
				jscolor.picker.padB.appendChild(jscolor.picker.pad);
				jscolor.picker.box.appendChild(jscolor.picker.padB);
				jscolor.picker.box.appendChild(jscolor.picker.padM);
				jscolor.picker.btnS.appendChild(jscolor.picker.btnT);
				jscolor.picker.btn.appendChild(jscolor.picker.btnS);
				jscolor.picker.box.appendChild(jscolor.picker.btn);
				jscolor.picker.boxB.appendChild(jscolor.picker.box);
			}

			var p = jscolor.picker;

			// controls interaction
			p.box.onmouseup =
			p.box.onmouseout = function() { target.focus(); };
			p.box.onmousedown = function() { abortBlur=true; };
			p.box.onmousemove = function(e) {
				if (holdPad || holdSld) {
					holdPad && setPad(e);
					holdSld && setSld(e);
					if (document.selection) {
						document.selection.empty();
					} else if (window.getSelection) {
						window.getSelection().removeAllRanges();
					}
					dispatchImmediateChange();
				}
			};
			if('ontouchstart' in window) { // if touch device
				var handle_touchmove = function(e) {
					var event={
						'offsetX': e.touches[0].pageX-touchOffset.X,
						'offsetY': e.touches[0].pageY-touchOffset.Y
					};
					if (holdPad || holdSld) {
						holdPad && setPad(event);
						holdSld && setSld(event);
						dispatchImmediateChange();
					}
					e.stopPropagation(); // prevent move "view" on broswer
					e.preventDefault(); // prevent Default - Android Fix (else android generated only 1-2 touchmove events)
				};
				p.box.removeEventListener('touchmove', handle_touchmove, false)
				p.box.addEventListener('touchmove', handle_touchmove, false)
			}
			p.padM.onmouseup =
			p.padM.onmouseout = function() { if(holdPad) { holdPad=false; jscolor.fireEvent(valueElement,'change'); } };
			p.padM.onmousedown = function(e) {
				// if the slider is at the bottom, move it up
				switch(modeID) {
					case 0: if (THIS.hsv[2] === 0) { THIS.fromHSV(null, null, 1.0); }; break;
					case 1: if (THIS.hsv[1] === 0) { THIS.fromHSV(null, 1.0, null); }; break;
				}
				holdSld=false;
				holdPad=true;
				setPad(e);
				dispatchImmediateChange();
			};
			if('ontouchstart' in window) {
				p.padM.addEventListener('touchstart', function(e) {
					touchOffset={
						'X': e.target.offsetParent.offsetLeft,
						'Y': e.target.offsetParent.offsetTop
					};
					this.onmousedown({
						'offsetX':e.touches[0].pageX-touchOffset.X,
						'offsetY':e.touches[0].pageY-touchOffset.Y
					});
				});
			}
			p.sldM.onmouseup =
			p.sldM.onmouseout = function() { if(holdSld) { holdSld=false; jscolor.fireEvent(valueElement,'change'); } };
			p.sldM.onmousedown = function(e) {
				holdPad=false;
				holdSld=true;
				setSld(e);
				dispatchImmediateChange();
			};
			if('ontouchstart' in window) {
				p.sldM.addEventListener('touchstart', function(e) {
					touchOffset={
						'X': e.target.offsetParent.offsetLeft,
						'Y': e.target.offsetParent.offsetTop
					};
					this.onmousedown({
						'offsetX':e.touches[0].pageX-touchOffset.X,
						'offsetY':e.touches[0].pageY-touchOffset.Y
					});
				});
			}

			// picker
			var dims = getPickerDims(THIS);
			p.box.style.width = dims[0] + 'px';
			p.box.style.height = dims[1] + 'px';

			// picker border
			p.boxB.id = "jscolor";
			p.boxB.className = "LivingColorImmune";
			p.boxB.style.position = 'absolute';
			p.boxB.style.clear = 'both';
			p.boxB.style.left = x+'px';
			p.boxB.style.top = y+'px';
			p.boxB.style.zIndex = THIS.pickerZIndex;
			p.boxB.style.border = THIS.pickerBorder+'px solid';
			p.boxB.style.borderColor = THIS.pickerBorderColor;
			p.boxB.style.background = THIS.pickerFaceColor;

			// pad image
			p.pad.style.width = jscolor.images.pad[0]+'px';
			p.pad.style.height = jscolor.images.pad[1]+'px';

			// pad border
			p.padB.style.position = 'absolute';
			p.padB.style.left = THIS.pickerFace+'px';
			p.padB.style.top = THIS.pickerFace+'px';
			p.padB.style.border = THIS.pickerInset+'px solid';
			p.padB.style.borderColor = THIS.pickerInsetColor;

			// pad mouse area
			p.padM.style.position = 'absolute';
			p.padM.style.left = '0';
			p.padM.style.top = '0';
			p.padM.style.width = THIS.pickerFace + 2*THIS.pickerInset + jscolor.images.pad[0] + jscolor.images.arrow[0] + 'px';
			p.padM.style.height = p.box.style.height;
			p.padM.style.cursor = 'crosshair';

			// slider image
			p.sld.style.overflow = 'hidden';
			p.sld.style.width = jscolor.images.sld[0]+'px';
			p.sld.style.height = jscolor.images.sld[1]+'px';

			// slider border
			p.sldB.style.display = THIS.slider ? 'block' : 'none';
			p.sldB.style.position = 'absolute';
			p.sldB.style.right = THIS.pickerFace+'px';
			p.sldB.style.top = THIS.pickerFace+'px';
			p.sldB.style.border = THIS.pickerInset+'px solid';
			p.sldB.style.borderColor = THIS.pickerInsetColor;

			// slider mouse area
			p.sldM.style.display = THIS.slider ? 'block' : 'none';
			p.sldM.style.position = 'absolute';
			p.sldM.style.right = '0';
			p.sldM.style.top = '0';
			p.sldM.style.width = jscolor.images.sld[0] + jscolor.images.arrow[0] + THIS.pickerFace + 2*THIS.pickerInset + 'px';
			p.sldM.style.height = p.box.style.height;
			try {
				p.sldM.style.cursor = 'pointer';
			} catch(eOldIE) {
				p.sldM.style.cursor = 'hand';
			}

			// "close" button
			function setBtnBorder() {
				var insetColors = THIS.pickerInsetColor.split(/\s+/);
				var pickerOutsetColor = insetColors.length < 2 ? insetColors[0] : insetColors[1] + ' ' + insetColors[0] + ' ' + insetColors[0] + ' ' + insetColors[1];
				p.btn.style.borderColor = pickerOutsetColor;
			}
			p.btn.style.display = THIS.pickerClosable ? 'block' : 'none';
			p.btn.style.position = 'absolute';
			p.btn.style.left = THIS.pickerFace + 'px';
			p.btn.style.bottom = THIS.pickerFace + 'px';
			p.btn.style.padding = '0 15px';
			p.btn.style.height = '18px';
			p.btn.style.border = THIS.pickerInset + 'px solid';
			setBtnBorder();
			p.btn.style.color = THIS.pickerButtonColor;
			p.btn.style.font = '12px sans-serif';
			p.btn.style.textAlign = 'center';
			try {
				p.btn.style.cursor = 'pointer';
			} catch(eOldIE) {
				p.btn.style.cursor = 'hand';
			}
			p.btn.onmousedown = function () {
				THIS.hidePicker();
			};
			p.btnS.style.lineHeight = p.btn.style.height;

			// load images in optimal order
			switch(modeID) {
				case 0: var padImg = 0?'hs.png':LivingColorImageHS(); break;
				case 1: var padImg = 0?'hv.png':LivingColorImageHV(); break;
			}
		//	p.padM.style.backgroundImage = "url('"+jscolor.getDir()+"cross.gif')";
			p.padM.style.backgroundImage = "url('data:image/gif;base64,R0lGODlhDwAPAKEBAAAAAP///////////yH5BAEKAAIALAAAAAAPAA8AAAIklB8Qx53b4otSUWcvyiz4/4AeQJbmKY4p1HHapBlwPL/uVRsFADs=')";
			p.padM.style.backgroundRepeat = "no-repeat";
		//	p.sldM.style.backgroundImage = "url('"+jscolor.getDir()+"arrow.gif')";
			p.sldM.style.backgroundImage = "url('data:image/gif;base64,R0lGODlhBwALAKECAAAAAP///6g8eKg8eCH5BAEKAAIALAAAAAAHAAsAAAITTIQYcLnsgGxvijrxqdQq6DRJAQA7')";
			p.sldM.style.backgroundRepeat = "no-repeat";
			//p.pad.style.backgroundImage = "url('"+jscolor.getDir()+padImg+"')";
			p.pad.style.backgroundImage = "url('"+padImg+"')";
			p.pad.style.backgroundRepeat = "no-repeat";
			p.pad.style.backgroundPosition = "0 0";

			// place pointers
			redrawPad();
			redrawSld();

			jscolor.picker.owner = THIS;
			document.getElementsByTagName('body')[0].appendChild(p.boxB);
		}


		function getPickerDims(o) {
			var dims = [
				2*o.pickerInset + 2*o.pickerFace + jscolor.images.pad[0] +
					(o.slider ? 2*o.pickerInset + 2*jscolor.images.arrow[0] + jscolor.images.sld[0] : 0),
				o.pickerClosable ?
					4*o.pickerInset + 3*o.pickerFace + jscolor.images.pad[1] + o.pickerButtonHeight :
					2*o.pickerInset + 2*o.pickerFace + jscolor.images.pad[1]
			];
			return dims;
		}


		function redrawPad() {
			// redraw the pad pointer
			switch(modeID) {
				case 0: var yComponent = 1; break;
				case 1: var yComponent = 2; break;
			}
			var x = Math.round((THIS.hsv[0]/6) * (jscolor.images.pad[0]-1));
			var y = Math.round((1-THIS.hsv[yComponent]) * (jscolor.images.pad[1]-1));
			jscolor.picker.padM.style.backgroundPosition =
				(THIS.pickerFace+THIS.pickerInset+x - Math.floor(jscolor.images.cross[0]/2)) + 'px ' +
				(THIS.pickerFace+THIS.pickerInset+y - Math.floor(jscolor.images.cross[1]/2)) + 'px';

			// redraw the slider image
			var seg = jscolor.picker.sld.childNodes;

			switch(modeID) {
				case 0:
					var rgb = HSV_RGB(THIS.hsv[0], THIS.hsv[1], 1);
					for(var i=0; i<seg.length; i+=1) {
						seg[i].style.backgroundColor = 'rgb('+
							(rgb[0]*(1-i/seg.length)*100)+'%,'+
							(rgb[1]*(1-i/seg.length)*100)+'%,'+
							(rgb[2]*(1-i/seg.length)*100)+'%)';
					}
					break;
				case 1:
					var rgb, s, c = [ THIS.hsv[2], 0, 0 ];
					var i = Math.floor(THIS.hsv[0]);
					var f = i%2 ? THIS.hsv[0]-i : 1-(THIS.hsv[0]-i);
					switch(i) {
						case 6:
						case 0: rgb=[0,1,2]; break;
						case 1: rgb=[1,0,2]; break;
						case 2: rgb=[2,0,1]; break;
						case 3: rgb=[2,1,0]; break;
						case 4: rgb=[1,2,0]; break;
						case 5: rgb=[0,2,1]; break;
					}
					for(var i=0; i<seg.length; i+=1) {
						s = 1 - 1/(seg.length-1)*i;
						c[1] = c[0] * (1 - s*f);
						c[2] = c[0] * (1 - s);
						seg[i].style.backgroundColor = 'rgb('+
							(c[rgb[0]]*100)+'%,'+
							(c[rgb[1]]*100)+'%,'+
							(c[rgb[2]]*100)+'%)';
					}
					break;
			}
		}


		function redrawSld() {
			// redraw the slider pointer
			switch(modeID) {
				case 0: var yComponent = 2; break;
				case 1: var yComponent = 1; break;
			}
			var y = Math.round((1-THIS.hsv[yComponent]) * (jscolor.images.sld[1]-1));
			jscolor.picker.sldM.style.backgroundPosition =
				'0 ' + (THIS.pickerFace+THIS.pickerInset+y - Math.floor(jscolor.images.arrow[1]/2)) + 'px';
		}


		function isPickerOwner() {
			return jscolor.picker && jscolor.picker.owner === THIS;
		}


		function blurTarget() {
			if(valueElement === target) {
				THIS.importColor();
			}
			if(THIS.pickerOnfocus) {
				THIS.hidePicker();
			}
		}


		function blurValue() {
			if(valueElement !== target) {
				THIS.importColor();
			}
		}


		function setPad(e) {
			var mpos = jscolor.getRelMousePos(e);
			var x = mpos.x - THIS.pickerFace - THIS.pickerInset;
			var y = mpos.y - THIS.pickerFace - THIS.pickerInset;
			switch(modeID) {
				case 0: THIS.fromHSV(x*(6/(jscolor.images.pad[0]-1)), 1 - y/(jscolor.images.pad[1]-1), null, leaveSld); break;
				case 1: THIS.fromHSV(x*(6/(jscolor.images.pad[0]-1)), null, 1 - y/(jscolor.images.pad[1]-1), leaveSld); break;
			}
		}


		function setSld(e) {
			var mpos = jscolor.getRelMousePos(e);
			var y = mpos.y - THIS.pickerFace - THIS.pickerInset;
			switch(modeID) {
				case 0: THIS.fromHSV(null, null, 1 - y/(jscolor.images.sld[1]-1), leavePad); break;
				case 1: THIS.fromHSV(null, 1 - y/(jscolor.images.sld[1]-1), null, leavePad); break;
			}
		}


		function dispatchImmediateChange() {
			if (THIS.onImmediateChange) {
				var callback;
				if (typeof THIS.onImmediateChange === 'string') {
					callback = new Function (THIS.onImmediateChange);
				} else {
					callback = THIS.onImmediateChange;
				}
				callback.call(THIS);
			}
		}


		var THIS = this;
		var modeID = this.pickerMode.toLowerCase()==='hvs' ? 1 : 0;
		var abortBlur = false;
		var
			valueElement = jscolor.fetchElement(this.valueElement),
			styleElement = jscolor.fetchElement(this.styleElement);
		var
			holdPad = false,
			holdSld = false,
			touchOffset = {};
		var
			leaveValue = 1<<0,
			leaveStyle = 1<<1,
			leavePad = 1<<2,
			leaveSld = 1<<3;

		// target
		jscolor.addEvent(target, 'focus', function() {
			if(THIS.pickerOnfocus) { THIS.showPicker(); }
		});
		jscolor.addEvent(target, 'blur', function() {
			if(!abortBlur) {
				window.setTimeout(function(){ abortBlur || blurTarget(); abortBlur=false; }, 0);
			} else {
				abortBlur = false;
			}
		});

		// valueElement
		if(valueElement) {
			var updateField = function() {
				THIS.fromString(valueElement.value, leaveValue);
				dispatchImmediateChange();
			};
			jscolor.addEvent(valueElement, 'keyup', updateField);
			jscolor.addEvent(valueElement, 'input', updateField);
			jscolor.addEvent(valueElement, 'blur', blurValue);
			valueElement.setAttribute('autocomplete', 'off');
		}

		// styleElement
		if(styleElement) {
			styleElement.jscStyle = {
				backgroundImage : styleElement.style.backgroundImage,
				backgroundColor : styleElement.style.backgroundColor,
				color : styleElement.style.color
			};
		}

		// require images
		switch(modeID) {
			//case 0: jscolor.requireImage('hs.png'); break;
			//case 1: jscolor.requireImage('hv.png'); break;
		}
		//jscolor.requireImage('cross.gif');
		//jscolor.requireImage('arrow.gif');

		this.importColor();
	}

};


jscolor.install();
