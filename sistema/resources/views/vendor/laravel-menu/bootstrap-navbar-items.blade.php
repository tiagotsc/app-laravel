@foreach($items as $item)

@php
  $attributesDiv = isset($item->link->attributes['aria-controls'])? $item->link->attributes['aria-controls']: '';
@endphp

  <li @lm_attrs($item) @if($item->hasChildren()) class="nav-item" @endif @lm_endattrs>
    @if($item->link) <a @lm_attrs($item->link) @if($item->hasChildren()) class="nav-link @if($item->isActive) active @endif" aria-expanded="@if($item->isActive) true @else false @endif" role="button" @data_toggle_attribute="dropdown" aria-haspopup="true" aria-expanded="false" @else class="nav-link @if((isset($item->link->path['route']) and \Request::url() == route($item->link->path['route'])) or \Request::url() == $item->url())active @endif" @endif @lm_endattrs href="{!! $item->url() !!}">
      {!! $item->title !!}
      @if($item->hasChildren()) <b class="caret"></b> @endif
      <!--@if(isset($item->attributes['class']) and $item->attributes['class'] == 'submenu-toggle')
      <div id="submenu-1" class="collapse submenu submenu-1 show" data-bs-parent="#menu-accordion">
        AQUI
      </div>
      @endif-->
    </a>
    @else
      <span class="navbar-text">{!! $item->title !!}</span>
    @endif
    @if($item->hasChildren())
    <div id="{{$attributesDiv }}" class="collapse submenu {{$attributesDiv }} @if($item->isActive) show @endif" data-bs-parent="#menu-accordion">
      <ul class="submenu-list list-unstyled">
        @include(config('laravel-menu.views.bootstrap-items'),
array('items' => $item->children()))
      </ul>
    </div>
    @endif
  </li>
  @if($item->divider)
  	<li{!! Lavary\Menu\Builder::attributes($item->divider) !!}></li>
  @endif
@endforeach
