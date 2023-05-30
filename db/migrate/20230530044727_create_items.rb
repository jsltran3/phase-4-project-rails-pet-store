class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :name
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :pet_store, null: false, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
