<#assign ages = "12">
${aa}中文
${ages!"df"}
<@tag bb="1">
<#list being as animals>
	${animals.name?html}
</#list>
</@tag>
${bb}
${being?size}
<#include "sub.html">