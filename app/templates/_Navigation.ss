<nav id="nav" class="nav" role="navigation">
    <ul>
        <% loop $Menu(1) %>
            <li class="$LinkingMode">
                <a href="$Link" title="$Title.XML">$MenuTitle.XML</a>
                <% if $Children %>
                    <ul>
                        <% loop $Children %>
                            <li class="$LinkingMode">
                                <a href="$Link" title="$Title.XML">$MenuTitle.XML</a>
                            </li>
                        <% end_loop %>
                    </ul>
                <% end_if %>
            </li>
        <% end_loop %>
    </ul>
</nav>
