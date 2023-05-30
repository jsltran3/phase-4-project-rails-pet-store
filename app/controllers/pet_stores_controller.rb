class PetStoresController < ApplicationController
    def create 
        party = Party.create!(party_params)
        render json: party, status: :created
    end
    
    def update
        party = Party.find_by(id: params[:id])
        user_id = @current_user.id

        if party.users.find_by(id: user_id)
            party.update(party_params)
            render json: party
        else
            # render json: { errors: [party.errors.full_messages] }, status: :unprocessable_entity
            render json: { errors: [party.errors.full_messages] }, status: 400
        end
    end

end
