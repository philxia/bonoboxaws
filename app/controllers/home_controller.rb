class HomeController < ApplicationController
  def index
    render :layout => false
  end

  def leftframe
  	render :layout => false
  end
end
