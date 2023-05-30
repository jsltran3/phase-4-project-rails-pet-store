class ItemsController < ApplicationController
    def create 
        item = @current_user.items.create(item_params)
      
        render json: item, status: :created
    end

    def update
        item = @current_user.items.find_by(id: params[:id])
        if item.user_id == @current_user.id
            item.update(item_params)
            render json: item
        else
            render json: { errors: [item.errors.full_messages] }, status: :unprocessable_entity
        end
    end

end