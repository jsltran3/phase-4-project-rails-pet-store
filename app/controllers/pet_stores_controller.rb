class PetStoresController < ApplicationController
    def create 
        store = PetStore.create!(store_params)
        render json: store, status: :created
    end
    
    def update
        store = PetStore.find_by(id: params[:id])
        user_id = @current_user.id

        if store.users.find_by(id: user_id)
            store.update(store_params)
            render json: store
        else
            # render json: { errors: [PetStore.errors.full_messages] }, status: :unprocessable_entity
            render json: { errors: [store.errors.full_messages] }, status: 400
        end
    end

    def index 
        stores = PetStore.all

        if session[:user_id]
            render json: stores
        else
            render json: { errors: ["Not authorized"] }, status: :unauthorized
        end
    end

    def show
        store = PetStore.find_by(id: params[:id])
        if store 
            render json: store
        else
            render json: { error: "Store not found" }
        end
    end

    def destroy 
        store = PetStore.find_by(id: params[:id])
        user_id = @current_user.id
        if store.users.find_by(id: user_id)
            store.destroy
            head :no_content
        else
            render json: { error: "Bad request, cannot be deleted" }, status: 400
        end
    end
    private 
    
    def store_params
        # NOTE:
        # Attempt to figure out how to incorporate 'location'
        params.permit(:name, :location)
    end

end
